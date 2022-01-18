import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FORGET_PASSWORD_SUCCESS,
  GET_CUSTOMER_FAILURE,
  GET_CUSTOMER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_ADDRESS_FAILURE,
} from '../constants/actionTypes';
import { setToken } from '../helpers/storage';

const INITIAL_STATE = {
  profile: {
    verified: false,
    cart: [],
  },
  address: [],
  authToken: null,
  errors: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload.data },
        errors: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        errors: action.payload.response.data?.[0]?.message,
      };
    case LOGIN_SUCCESS:
      setToken('authToken', action.payload.token);
      AsyncStorage.setItem('userId', action.payload.customer.id.toString());
      return {
        ...state,
        profile: {
          ...action.payload.customer,
        },
        authToken: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.payload.error,
      };
    case LOGOUT_SUCCESS:
      AsyncStorage.removeItem('authToken');
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('cartItems');

      return {
        ...state,
        profile: { verified: false },
        authToken: null,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload,
          verified: true,
        },
      };
    case GET_CUSTOMER_FAILURE:
      AsyncStorage.removeItem('products');

      return {
        ...state,
        profile: { verified: false },
        errors: action.payload.message,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload.data },
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload.data },
      };
    case GET_CUSTOMER_ADDRESS_SUCCESS:
      return { ...state, address: action.payload.data };
    case GET_CUSTOMER_ADDRESS_FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
}
