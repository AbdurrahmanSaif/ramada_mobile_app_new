import ajax from './ajax';
import { attach } from './ajax';

export function checkoutOrder(data) {
  return ajax('/orders', { method: 'POST', data });
}

export function checkout(data) {
  return ajax('/orders/checkout', { method: 'POST', data });
}

export function verifyPayment(data) {
  return ajax('/orders/verify_payment', { method: 'POST', data });
}

export function getAllOrders(page) {
  return ajax(`/orders?sort=-id&per-page=20&page=${page}`);
}

export function getOrderDetails(orderId) {
  return ajax(`/orders/items?orderId=${orderId}`);
}

export function attachment(formData) {
  return attach('/orders/attachment', formData);
}
