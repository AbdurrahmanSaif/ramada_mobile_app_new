import { createAction } from 'redux-actions';
import { updateProfile } from '../actions/customer';
import {
  UPDATE_CART,
} from '../constants/actionTypes';

const updateCartAction = createAction(UPDATE_CART);

export function updateCart(payload) {
  return dispatch => dispatch(updateCartAction(payload));
}