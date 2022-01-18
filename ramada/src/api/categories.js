import ajax from "./ajax";

export function getCategory(params) {
  return ajax(`/categories?CategoriesSearch[parent_category]=1&sort=display_order`);
}
