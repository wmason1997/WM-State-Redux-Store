// NEEDED TO IMPORT THIS SO THAT I COULD ORGANIZE THE REDUCERS BASED ON WHAT THEY WORK ON
import { combineReducers } from 'redux';

import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// Refactored below so that each reducer handles a specific part of the state

// Products Reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return [...action.products];
    default:
      return state;
  }
};

// Cart Reducer
const cartReducer = (state = { cartOpen: false, cart: [] }, action ) => {
  let newState; // Declare newState here as it can't be declared in a case block

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
      case UPDATE_CART_QUANTITY: 
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
      case REMOVE_FROM_CART: 
        newState = state.cart.filter((product) => {
          return product._id !== action._id;
        });
      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState,
        };
      
      case ADD_MULTIPLE_TO_CART: 
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

        case CLEAR_CART: 
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

        case TOGGLE_CART: 
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
      
      default: 
        return state;
  }
};

// Categories Reducer
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return [...action.categories];
    default:
      return state;
  }
};

// Current Category Reducer
const currentCategoryReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CURRENT_CATEGORY:
      return action.currentCategory;
    default:
      return state;
  }
};

// Combine all reducers into a single rootReducer and should make this application handle state more efficiently with Redux
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer
});

export default rootReducer;
