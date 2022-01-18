import { createAction } from 'redux-actions';
import { getBannerList } from '../api/items';

import {
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILURE,
} from '../constants/actionTypes';

const getBannerSuccess = createAction(GET_BANNERS_SUCCESS);
const getBannerFailure = createAction(GET_BANNERS_FAILURE);

export function getBanners() {
  return dispatch =>
    getBannerList('banners', 'BannersSearch[category]=Mobile Homepage Banners')
      .then(json => dispatch(getBannerSuccess({ ...json })))
      .catch(error => dispatch(getBannerFailure(error)));
}
