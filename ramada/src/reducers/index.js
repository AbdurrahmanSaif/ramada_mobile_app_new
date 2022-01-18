import { combineReducers } from 'redux';

import nav from './nav';
import cart from './cart';
import menus from './menus';
import categories from './categories';
import products from './products';
import snackbar from './snackbar';
import banners from './banners';
import contents from './contents';
import notifications from './notifications';
import auth from './customer';
import orders from './orders';
import media from './media';

const appReducers = combineReducers({
  nav,
  cart,
  menus,
  categories,
  snackbar,
  products,
  banners,
  contents,
  notifications,
  auth,
  orders,
  gallery: media,
});

export default appReducers;
