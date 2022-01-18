import { createAction } from 'redux-actions';
import { getSettingsDetails } from '../api/settings';
import { GET_SETTINGS_FAILURE, GET_SETTINGS_SUCCESS } from '../constants/actionTypes';

const getSettingsSuccess = createAction(GET_SETTINGS_SUCCESS);
const getSettingsFailure = createAction(GET_SETTINGS_FAILURE);

export function getSettingsInfo(moduleName) {
  return dispatch => getSettingsDetails(moduleName)
    .then(json => dispatch(getSettingsSuccess({ data: json, module: moduleName })))
    .catch(err => dispatch(getSettingsFailure(err)));
}
