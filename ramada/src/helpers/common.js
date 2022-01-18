export const apiUrl = 'https://pillsgo.com/backend/api/web';
export const backendUrl = 'https://pillsgo.com/backend';

export const capitalize = str =>
  `${str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()}`;

export const sortFn = (el1, el2, sortKey = 'display_order') =>
  el1[sortKey] > el2[sortKey] ? 1 : -1;

export const imageUrl = (name, prefix = 'products', sizePrefix = '120x120-') =>
  `${backendUrl}/data/${prefix}/${sizePrefix}${name}`;

export const convertToSlug = text =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

export const initials = name => {
  const splittedName = name?.split(' ');

  return (
    splittedName?.[0].charAt(0) +
    splittedName?.[splittedName.length - 1]?.charAt(0)
  );
};

export const camelToSnakeCase = str =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

// it is used to make the given string into array by splitting using the given seperator.
export const toArray = (value, seperator) => {
  let arr = [];
  if (value) {
    arr = value
      .split(seperator)
      .filter(Boolean)
      .map(v => v.trim());
  }
  return arr;
};

export const prescriptionRequired = product => {
  return product?.additional_fields?.prescription_required === 'Yes';
};

export const truncate = (str, n) =>
  str.length > n ? str.substr(0, n - 1) + '...' : str;

export const getSettingByKey = (settings, keyName) =>
  settings.find(setting => setting.key === keyName);

export const simpleDateTime = date => {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', dateOptions);
};
