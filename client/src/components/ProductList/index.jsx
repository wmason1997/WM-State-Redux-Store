import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import { useDispatch, useStore } from "react-redux";

function ProductList() {
  const store = useStore();
  const dispatch = useDispatch();

  // Retrieve currentCategory from the Redux store state
  const currentCategory = store.getState().currentCategory;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [products, setProducts] = useState(''); // Initialize products state

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  useEffect(() => {
    if (store.getState().products) {
      setProducts(store.getState().products); // Update products state when products in the Redux store change
    }
  }, [store]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    } 

    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
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
