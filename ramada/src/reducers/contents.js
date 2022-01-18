
import { GET_CONTENTS_FAILURE, GET_CONTENTS_SUCCESS, GET_SETTINGS_FAILURE, GET_SETTINGS_SUCCESS } from '../constants/actionTypes';

const INITIAL_STATE = {
  testimonials: [],
  frontend: [],
  error: null
};

export default function contents(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CONTENTS_SUCCESS:
      return { ...state, [action.payload.category]: action.payload.data };
    case GET_CONTENTS_FAILURE:
    case GET_SETTINGS_FAILURE:
      return { ...state, error: action.payload.error }
    case GET_SETTINGS_SUCCESS:
      return { ...state, [action.payload.module]: action.payload.data };
    default:
      return state;
  }
}
