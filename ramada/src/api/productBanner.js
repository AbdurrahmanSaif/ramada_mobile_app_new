import ajax from './ajax';

export const fetchBannerContent = category => {
  return ajax(`/banners?BannersSearch[category]=${category}`);
};
