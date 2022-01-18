import { createAction } from 'redux-actions';

import { showMessage } from 'react-native-flash-message';

import {
  getAllReviews,
  getItemList,
  getSearchList,
  postReview,
} from '../api/items';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_REVIEWS_FAILURE,
  GET_REVIEWS_SUCCESS,
  SUBMIT_REVIEW_FAILURE,
  SUBMIT_REVIEW_SUCCESS,
} from '../constants/actionTypes';

const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS);
const getProductsFailure = createAction(GET_PRODUCTS_FAILURE);

export function getProductsByLabel(label) {
  return dispatch =>
    getItemList(`ProductsSearch[product_labels]=${label}`, 100, 1)
      .then(data => dispatch(getProductsSuccess({ label, data })))
      .catch(error => dispatch(getProductsFailure(error)));
}

export function getProducts(params, perPage, page) {
  return dispatch => {
    return getItemList(params, perPage, page)
      .then(json => dispatch(getProductsSuccess({ data: json })))
      .catch(error => dispatch(getProductsFailure(error)));
  };
}

const submitReviewSuccess = createAction(SUBMIT_REVIEW_SUCCESS);
const submitReviewFailure = createAction(SUBMIT_REVIEW_FAILURE);

export function submitNewReview(params, customer) {
  return dispatch =>
    postReview(params)
      .then(data => {
        showMessage({
          message: 'Your review has been submitted',
          type: 'success',
          floating: true,
        });

        dispatch(submitReviewSuccess({ ...params, customer }));
        return true;
      })
      .catch(error => {
        dispatch(submitReviewFailure(error));
        return false;
      });
}

const getReviewsSuccess = createAction(GET_REVIEWS_SUCCESS);
const getReviewsFailure = createAction(GET_REVIEWS_FAILURE);

export function getReviews(productId) {
  return dispatch =>
    getAllReviews(productId)
      .then(data => dispatch(getReviewsSuccess(data)))
      .catch(error => dispatch(getReviewsFailure(error)));
}

// export function searchProducts(keywords) {
//   return getSearchList('?ProductsSearch[keyword]=' + keywords, 100, 1);
// }
