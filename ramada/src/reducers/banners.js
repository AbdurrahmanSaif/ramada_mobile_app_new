import {
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILURE,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  data: [],
};

export default function banners(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BANNERS_SUCCESS:
      return { ...state, data: action.payload };
    case GET_BANNERS_FAILURE:
      return { ...state, data: [] };
    default:
      return state;
  }
}
