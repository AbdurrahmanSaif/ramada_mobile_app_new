import ajax from './ajax';

export function signUpRequest(params) {
  return ajax('/customers', { method: 'POST', data: params });
}

export function verifyOtp(params) {
  return ajax('/customers/verify_mobile_otp', { method: 'POST', data: params });
}

// export function login(params) {
//   return ajax('/customers/login', { method: 'POST', data: params });
// }
export function login(params) {
  return ajax('/customers/login_using_otp', { method: 'POST', data: params });
}

export function addAddress(data) {
  return ajax('/customers/address', { method: 'POST', data });
}

export function updateProfile(params) {
  return ajax('/customers/update_customer', { method: 'PUT', data: params });
}

export function deleteShippingAddress(params, id) {
  return ajax(`/customers/address/${id}`, { method: 'DELETE', data: params });
}

export function updateAddress(params, id) {
  return ajax(`/customers/address/${id}`, { method: 'PUT', data: params });
}

export function getCustomerDetails(userId) {
  return ajax(`/customers/${userId}`);
}

export function getAddress() {
  return ajax(`/customers/address`);
}

export function forgetPassword(params) {
  return ajax('/customers/forgot_password', { method: 'POST', data: params });
}

export function forgetPasswordOtpCheck(params) {
  return ajax('/customers/verify_forgot_password_otp', { method: 'POST', data: params });
}

export function changePassword(params) {
  return ajax('/customers/change_password', { method: 'POST', data: params });
}
