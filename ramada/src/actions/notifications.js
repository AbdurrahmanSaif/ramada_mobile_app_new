import { createAction } from 'redux-actions';
import { getUserNotifications } from '../api/notifications';

import {
    GET_NOTIFICATIONS_FAILURE,
    GET_NOTIFICATIONS_SUCCESS,
} from '../constants/actionTypes';

const getNotificationsSuccess = createAction(GET_NOTIFICATIONS_SUCCESS);
const getNotificationsFailure = createAction(GET_NOTIFICATIONS_FAILURE);

export function getNotifications() {

    return dispatch =>
        getUserNotifications()
            .then(data => dispatch(getNotificationsSuccess(data)))
            .catch(error => dispatch(getNotificationsFailure(error)));
}
