import { createAction } from 'redux-actions';

import { SET_NAV_OPTIONS } from '../constants/actionTypes';

const setNavbarOptions = createAction(SET_NAV_OPTIONS);

export function setNavabarOptions(title) {
  return dispatch => dispatch(setNavbarOptions(title));
}
