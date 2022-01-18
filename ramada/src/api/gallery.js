import ajax from "./ajax";

export function getMediaList(type) {
  return ajax(`/${type}gallery?sort=display_order`);
}
