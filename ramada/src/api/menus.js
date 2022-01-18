import ajax from "./ajax";

export function getMenu(category) {
  return ajax(`/menus?MenusSearch[category]=${category}&sort=display_order`);
}
