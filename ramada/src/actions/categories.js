import { createAction } from 'redux-actions';
import * as Categories from '../api/categories';
import { GET_CATEGORY_FAILURE, GET_CATEGORY_SUCCESS } from '../constants/actionTypes';


const getCategorySuccess = createAction(GET_CATEGORY_SUCCESS);
const getCategoryFailure = createAction(GET_CATEGORY_FAILURE);

export function getCategory(params) {
  return dispatch => Categories.getCategory(params?? {}).then(data => {
    dispatch(getCategorySuccess({ data }));
  }).catch(error => {
    getCategoryFailure(error);
  });
}
