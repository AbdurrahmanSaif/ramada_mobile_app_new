import * as MenuApi from '../api/menus';
import { createAction } from 'redux-actions';

import { GET_MENU_FAILURE, GET_MENU_SUCCESS } from '../constants/actionTypes';

const getMenuSuccess = createAction(GET_MENU_SUCCESS);
const getMenuFailure = createAction(GET_MENU_FAILURE);

export function getMenus(params) {
  return dispatch => MenuApi.getMenu(params).then(({ data }) => {
    dispatch(getMenuSuccess({ data, category: params }));
  }).catch(error => {
    dispatch(getMenuFailure(error));
  });
}

