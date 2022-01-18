import { contactUs } from '../api/contacts';
import { CONTACT_US_SUCCESS, CONTACT_US_FAILURE } from '../constants/actionTypes';

import { createAction } from 'redux-actions';

const contactUsSuccess = createAction(CONTACT_US_SUCCESS);
const contactUsFailure = createAction(CONTACT_US_FAILURE);

export function postContactUs(params) {
  return dispatch => contactUs(params)
    .then(json => {
      dispatch(contactUsSuccess(json));
      return json;
    })
    .catch(error => {
      dispatch(contactUsFailure(error));
      return error;
    });
}
