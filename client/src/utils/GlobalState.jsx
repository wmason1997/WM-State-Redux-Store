// import { createContext, useContext, useReducer } from "react";
// import { reducer } from './reducers'

// const StoreContext = createContext();
// const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: '',
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const StoreProvider = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, StoreProvider };

// import React from "react";

import { Provider } from "react-redux";

// Import Redux store frrom the file created in /utils
import store from "./store";

const StoreProvider = (props) => {
  return <Provider store={store} {...props} />;
};

export default StoreProvider;
