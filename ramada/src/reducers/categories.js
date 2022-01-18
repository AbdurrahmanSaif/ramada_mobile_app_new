import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from '../constants/actionTypes';

const INITIAL_STATE = { mainCategories: [] };

export default function menus(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      return { ...state, mainCategories: action.payload.data };
    case GET_CATEGORY_FAILURE:
      return { ...state, mainCategories: [] };
    default:
      return state;
  }
}
