import { createAction } from "redux-actions";
import { getMediaList } from "../api/gallery";
import { GET_MEDIAS_SUCCESS, GET_MEDIAS_FAILURE } from '../constants/actionTypes';

const getMediasSuccess = createAction(GET_MEDIAS_SUCCESS);
const getMediasFailure = createAction(GET_MEDIAS_FAILURE);

export function getAllMedias(type) {
  return dispatch => getMediaList(type)
    .then(json => dispatch(getMediasSuccess({ data: json, type})))
    .catch(error => dispatch(getMediasFailure(error)));
}
