import {
  CHECKOUT_ORDER_FAILURE,
  CHECKOUT_ORDER_SUCCESS,
  GET_ALL_ORDER_SUCCESS,
  GET_ORDER_DETAILS_SUCCESS,
  PLACE_ORDER_SUCCESS,
  VERIFY_PAYMENT_SUCCESS,
  ORDER_ATTACHMENT_ERROR,
  ORDER_ATTACHMENT_LOADED,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  order: null,
  tempOrder: null,
  shippingDetails: null,
  list: [],
  currOrder: [],
  error: null,
  attachment: {
    error: false,
    data: null,
  },
};

export default function orders(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECKOUT_ORDER_SUCCESS:
      return { ...state, tempOrder: action.payload };
    case CHECKOUT_ORDER_FAILURE:
      return { ...state, error: action.payload.error };
    case PLACE_ORDER_SUCCESS:
      return { ...state, order: action.payload };
    case GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return { ...state, currOrder: action.payload };
    case VERIFY_PAYMENT_SUCCESS:
      return { ...state, list: [], tempOrder: null };
    case ORDER_ATTACHMENT_ERROR:
      return {
        ...state,
        attachment: { ...state.attachment, error: true },
      };
    case ORDER_ATTACHMENT_LOADED:
      return {
        ...state,
        attachment: { ...state.attachment, data: action.payload },
      };
    default:
      return state;
  }
}
