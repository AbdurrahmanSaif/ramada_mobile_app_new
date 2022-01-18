import { capitalize, isEmpty } from 'lodash';

export default function isActive(value) {
  const { pathname } = window.location;
  return pathname === value ? 'active' : '';
}

export function queryParams(itemName, queryParamsObj, perPage, page) {
  let queryParams = '';

  if (isEmpty(queryParamsObj) && !perPage && !page) {
    return queryParams;
  }

  if (!isEmpty(queryParamsObj)) {
    Object.keys(queryParamsObj).forEach((obj, index) => {
      queryParams += `${index > 0 ? '&' : ''}${capitalize(itemName)}Search[${obj}]=${queryParamsObj[obj]}`;
    });
  }

  if (perPage && page) {
    queryParams += `${queryParams !== '' && '&'}per-page=${perPage}&page=${page}`;
  }

  return `?${queryParams}`;
}
