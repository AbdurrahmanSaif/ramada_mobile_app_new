import ajax from './ajax';

export function contactUs(data) {
  return ajax('/contacts', { method: 'POST', data });
}
