import camelcase from 'camelcase';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_REVIEWS_SUCCESS,
  SUBMIT_REVIEW_SUCCESS,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  list: [],
  'Exclusive': [],
  'Best Sellers': [],
  reviews: [],
  error: null,
  pageCount: 0,
  itemCount: 0,
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:

      // getting product by label.
      if (action.payload.label) {
        return {
          ...state,
          [action.payload.label]: action.payload.data,
        };
      }

      return {
        ...state,
        list: action.payload.data,
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
      };
    case SUBMIT_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    default:
      return state;
  }
}
