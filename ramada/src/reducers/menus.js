import camelCase from 'camelcase';
import { GET_MENU_SUCCESS, GET_MENU_FAILURE } from '../constants/actionTypes';

const INITIAL_STATE = { topMenu: [], footerMainMenu: [], footerShoppingMenu: [] };

export default function menus(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MENU_SUCCESS:
      return { ...state, [camelCase(action.payload.category)]: action.payload.data };
    case GET_MENU_FAILURE:
      return { ...state, menus: [] };
    default:
      return state;
  }
}
