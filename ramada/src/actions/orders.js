/* eslint-disable no-debugger */
import axios from 'axios';
import { createAction } from 'redux-actions';
import * as Order from '../api/orders';
import {
  CHECKOUT_ORDER_FAILURE,
  CHECKOUT_ORDER_SUCCESS,
  GET_ALL_ORDER_FAILURE,
  GET_ALL_ORDER_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_SUCCESS,
  ORDER_ATTACHMENT_ERROR,
  ORDER_ATTACHMENT_LOADED,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
  VERIFY_PAYMENT_SUCCESS,
} from '../constants/actionTypes';
import { apiUrl } from '../helpers/common';
import { updateProfile } from './customer';

const checkoutOrderSuccess = createAction(CHECKOUT_ORDER_SUCCESS);
const checkoutOrderFailure = createAction(CHECKOUT_ORDER_FAILURE);

export function checkoutOrder(params) {
  return dispatch =>
    Order.checkoutOrder(params)
      .then(json => {
        dispatch(checkoutOrderSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(checkoutOrderFailure(error));
        return error;
      });
}

const placeOrderSuccess = createAction(PLACE_ORDER_SUCCESS);
const placeOrderFailure = createAction(PLACE_ORDER_FAILURE);

export function checkout(data) {
  return dispatch =>
    Order.checkout(data)
      .then(json => {
        dispatch(placeOrderSuccess(json));
        return json;
      })
      .catch(error => {
        // dispatch(placeOrderFailure(error));
        if (error?.response) {
          throw error.response;
        } else {
          throw error;
        }
      });
}

const getAllOrderSuccess = createAction(GET_ALL_ORDER_SUCCESS);
const getAllOrderFailure = createAction(GET_ALL_ORDER_FAILURE);

export function getAllOrder(page) {
  return dispatch =>
    Order.getAllOrders(page)
      .then(json => dispatch(getAllOrderSuccess(json)))
      .catch(error => dispatch(getAllOrderFailure(error)));
}

const getOrderDetailsSuccess = createAction(GET_ORDER_DETAILS_SUCCESS);
const getOrderDetailsFailure = createAction(GET_ORDER_DETAILS_FAILURE);

export function getOrderDetails(orderId) {
  return dispatch =>
    Order.getOrderDetails(orderId)
      .then(json => {
        dispatch(getOrderDetailsSuccess(json));
        return true;
      })
      .catch(error => {
        dispatch(getOrderDetailsFailure(error));
        return false;
      });
}

export const uploadOrdersAttachment = async (dispatch, token, formData) => {
  alert(1);
  try {
    debugger;
    const response = await axios.post(`${apiUrl}/orders/attachment`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
      },
    });
    dispatch({ type: ORDER_ATTACHMENT_LOADED, payload: response.data });
    alert(2);
    console.log('response.data::', response.data);
    debugger;
  } catch (err) {
    alert(3);

    if (err && err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    }
    dispatch({ type: ORDER_ATTACHMENT_ERROR });
  }
};

// const verifyPaymentSuccess = createAction(VERIFY_PAYMENT_SUCCESS);
// const verifyPaymentFailure = createAction(VERIFY_PAYMENT_FAILURE);

// export function verifyPayment(data) {
//   return dispatch => Order.verifyPayment(data)
//     .then(json => {
//       console.log('json::', json);
//       dispatch(updateProfile({ cart_data: JSON.stringify([]) }));
//       dispatch(verifyPaymentSuccess(json));
//       return true;
//     })
//     .catch(error => {
//       console.log('error::', error);
//       dispatch(verifyPaymentFailure(error));
//       return false;
//     });
// }
