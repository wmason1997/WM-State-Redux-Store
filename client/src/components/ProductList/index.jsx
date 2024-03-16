import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../ProductItem';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.currentCategory);
  const products = useSelector((state) => state.products);
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_PRODUCTS, products: data.products });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading && products.length === 0) {
      idbPromise('products', 'get').then((products) => {
        dispatch({ type: UPDATE_PRODUCTS, products });
      });
    }
  }, [data, loading, dispatch, products]);

  function filterProducts() {
    if (!products || products.length === 0) {
      return []; // Return an empty array if products is undefined or empty
    }

    if (!currentCategory) {
      return products;
    }

    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products && products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              item={product}
            />
          ))}
        </div>
      ) : (
        <h3>You have not added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;