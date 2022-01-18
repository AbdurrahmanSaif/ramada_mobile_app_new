import { createAction } from 'redux-actions';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import * as Auth from '../api/customer';
import {
  FORGET_PASSWORD_FAILURE,
  FORGET_PASSWORD_SUCCESS,
  GET_CUSTOMER_FAILURE,
  GET_CUSTOMER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_ADDRESS_FAILURE,
} from '../constants/actionTypes';
import { apiUrl } from '../helpers/common';

const signUpSuccess = createAction(SIGNUP_SUCCESS);
const signUpFailure = createAction(SIGNUP_FAILURE);

export function signUp(params) {
  return dispatch =>
    Auth.signUpRequest(params)
      .then(json => {
        dispatch(signUpSuccess(json));

        showMessage({
          message: 'An OTP has been sent to your mobile number!',
          type: 'success',
          floating: true,
        });

        return true;
      })
      .catch(error => {
        if (error.message.indexOf('422') > -1) {
          showMessage({
            message: 'The mobile number already exists.',
            type: 'danger',
            floating: true,
          });
        } else {
          showMessage({
            message: 'Something went wrong.',
            type: 'danger',
            floating: true,
          });
        }

        dispatch(signUpFailure(error));
        return false;
      });
}

const verifyOtpSuccess = createAction(VERIFY_OTP_SUCCESS);
const verifyOtpFailure = createAction(VERIFY_OTP_FAILURE);

export function verifyOtp(params) {
  return dispatch =>
    Auth.verifyOtp(params)
      .then(json => {
        showMessage({
          message: 'OTP verified successfully!',
          type: 'success',
          floating: true,
        });

        dispatch(verifyOtpSuccess(json));
        return true;
      })
      .catch(error => {
        showMessage({
          message: 'OTP verification failed ! Please try again !',
          type: 'danger',
          floating: true,
        });

        dispatch(verifyOtpFailure(error));
        return false;
      });
}

const loginSuccess = createAction(LOGIN_SUCCESS);
const loginFailure = createAction(LOGIN_FAILURE);

export function login(params) {
  return dispatch =>
    Auth.login(params)
      .then(json => {
        dispatch(loginSuccess(json));
        return json;
      })
      .catch(error => {
        console.log('error::', error);
        if (error.toString().includes('Network Error')) {
          showMessage({
            message:
              'Network error occurred. Please check your internet connection.',
            type: 'danger',
            floating: true,
          });
        } else {
          showMessage({
            message: 'Invalid mobile number or password',
            type: 'danger',
            floating: true,
          });
          dispatch(
            loginFailure({ error: 'Invalid mobile number or password' }),
          );
        }

        return error;
      });
}

export const sendLoginOtp = mobile_number => {
  return axios.post(
    `${apiUrl}/customers/get_login_otp`,
    { mobile_number },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

const updateProfileSuccess = createAction(UPDATE_PROFILE_SUCCESS);
const updateProfileFailure = createAction(UPDATE_PROFILE_FAILURE);

export function updateProfile(params) {
  return dispatch =>
    Auth.updateProfile(params)
      .then(data => {
        dispatch(updateProfileSuccess({ data }));
        return true;
      })
      .catch(error => {
        dispatch(updateProfileFailure(error));
        return false;
      });
}

const getProfileSucess = createAction(GET_CUSTOMER_SUCCESS);
const getProfileFailure = createAction(GET_CUSTOMER_FAILURE);

export function getCustomerDetails(userId) {
  return dispatch =>
    Auth.getCustomerDetails(userId)
      .then(json => {
        dispatch(getProfileSucess(json));
        return true;
      })
      .catch(error => {
        getProfileFailure(error);
        return false;
      });
}

const logoutSuccess = createAction(LOGOUT_SUCCESS);

export function logout() {
  return dispatch => dispatch(logoutSuccess());
}

const forgetPasswordSuccess = createAction(FORGET_PASSWORD_SUCCESS);
const forgetPasswordFailure = createAction(FORGET_PASSWORD_FAILURE);

export function forgetPassword(params) {

  return dispatch =>
    Auth.forgetPassword(params)
      .then(json => {
        dispatch(forgetPasswordSuccess(json));

        showMessage({
          message: `An OTP sent to your mobile number +${params.mobile_number}`,
          type: 'success',
          floating: true,
        });

        return true;
      })
      .catch(error => {
        showMessage({
          message: 'Sorry something went wrong',
          type: 'success',
          floating: true,
        });

        dispatch(forgetPasswordFailure(error));
        return false;
      });
}

const customerAddressSuccess = createAction(GET_CUSTOMER_ADDRESS_SUCCESS);
const customerAddressFailure = createAction(GET_CUSTOMER_ADDRESS_FAILURE);

export function getCustomerAddress() {
  return dispatch => {
    return Auth.getAddress()
      .then(json => dispatch(customerAddressSuccess({ data: json })))
      .catch(error => dispatch(customerAddressFailure(error)));
  };
}
