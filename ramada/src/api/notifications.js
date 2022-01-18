import ajax from './ajax';

export function getUserNotifications() {
    return ajax(`/notifications?sort=-id&per-page=1000&page=1`);
}

