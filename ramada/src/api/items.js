import ajax from './ajax';

export function getItemList(params, perPage, page) {
  let url = `/products?${params}&per-page=${perPage}&page=${page}`;
  return ajax(url);
}

export function getBannerList(itemName, queryParamsObj, perPage, page) {
  let bannerUrl = `/${itemName}?${queryParamsObj}`;
  return ajax(bannerUrl);
}

export function getSingleItem(id) {
  return ajax(`/products/${id}`);
}

export function getSearchList(params, perPage, page) {
  let url = `/products${params}&per-page=${perPage}&page=${page}`;
  return ajax(url);
}

export function postReview(params) {
  return ajax('/products/reviews', { method: 'POST', data: params });
}

export function getAllReviews(productId) {
  return ajax(
    `/products/reviews?product_id=${productId}&sort=-id&per-page=200&page=1`,
  );
}

export function getCouponCodeList() {
  return ajax('/coupons?sort=display_order&per-page=15&page=1');
}

export const searchProducts = searchVal => {
  return ajax(`/products?ProductsSearch[keyword]=${searchVal}`);
};
