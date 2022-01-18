/* eslint-disable no-case-declarations */

import { UPDATE_CART } from '../constants/actionTypes';

const INITIAL_STATE = { items: [] };

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CART:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
