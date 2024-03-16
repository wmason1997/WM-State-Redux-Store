import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({ type: UPDATE_CATEGORIES, categories: categoryData.categories });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading && (!categories || categories.length === 0)) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({ type: UPDATE_CATEGORIES, categories });
      });
    }
  }, [categoryData, loading, dispatch, categories]);

  const handleClick = (id) => {
    dispatch(UPDATE_CURRENT_CATEGORY(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories && categories.length ? (
        categories.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              handleClick(item._id);
            }}
          >
            {item.name}
          </button>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;