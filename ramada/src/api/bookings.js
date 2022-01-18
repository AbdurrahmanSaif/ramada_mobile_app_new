import ajax from './ajax';

export default function roomBooking(data) {
  return ajax('/roombookings', { method: 'POST', data })
}

export function banquetBooking(data) {
  return ajax('/banquetbookings', { method: 'POST', data })
}
