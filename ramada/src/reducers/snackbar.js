import { SHOW_SNACKBAR_SUCCESS, SHOW_SNACKBAR_ERROR, HIDE_SNACKBAR } from '../constants/actionTypes';

const INITIAL_STATE = { message: '', visible: false, action: null, severity: null, actionText: null };

export default function snackbar(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_SNACKBAR_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        visible: true,
        action: action.payload.action,
        severity: 'success',
        actionText: action.payload.actionText
      };

    case SHOW_SNACKBAR_ERROR:
      return {
        ...state,
        message: action.payload.message,
        visible: true,
        action: action.payload.action,
        severity: 'error',
        actionText: action.payload.actionText
      };

    case HIDE_SNACKBAR:
      return {
        ...state,
        message: '',
        visible: false
      };
    default:
      return state;
  }
}
