import { createAction } from 'redux-actions';
import { getItemList } from '../api/items';

import { GET_CONTENTS_SUCCESS, GET_CONTENTS_FAILURE } from '../constants/actionTypes';

const getContentSuccess = createAction(GET_CONTENTS_SUCCESS);
const getContentFailure = createAction(GET_CONTENTS_FAILURE);

export function getContents(category) {
  return dispatch => getItemList('contents', { category })
    .then((json) => dispatch(getContentSuccess({ ...json, category })))
    .catch(error => dispatch(getContentFailure(error)))
}
