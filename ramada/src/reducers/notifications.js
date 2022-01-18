import {
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    SET_LAST_NOTIFICATION_COUNT,
    SET_PENDING_NOTIFICATION_COUNT,
} from '../constants/actionTypes';

const INITIAL_STATE = {
    data: [],
    pendingNotifications: 0
};

export default function menus(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS_SUCCESS:
            return { ...state, data: action.payload };
        case SET_PENDING_NOTIFICATION_COUNT:
            return { ...state, pendingNotifications: action.count };
        case GET_NOTIFICATIONS_FAILURE:
            return { ...state, data: [] };
        default:
            return state;
    }
}
