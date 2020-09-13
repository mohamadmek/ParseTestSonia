import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import ProductsReducer from './Products';

export default combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
});