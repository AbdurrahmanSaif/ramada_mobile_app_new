import { GET_MEDIAS_FAILURE, GET_MEDIAS_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = { videos: [], images: []};

export default function videoGallery(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_MEDIAS_SUCCESS:
      return { ...state, [`${action.payload.type}s`]: action.payload.data };
    case GET_MEDIAS_FAILURE:
      return { ...state };
    default:
      return state;
  }
}
