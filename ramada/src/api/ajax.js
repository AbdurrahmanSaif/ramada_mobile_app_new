import axios from 'axios';
import { getToken } from '../helpers/storage';

import { apiUrl } from '../helpers/common';

export const clientUrl = uri => {
  const uriPath = uri.startsWith('/') ? uri : `/${uri}`;

  return `${apiUrl}${uriPath}`;
};

// axios.interceptors.request.use(
//   async config => {
//     const token = await getToken('authToken');
//     console.log('token::', token);
//     const newConfig = config;

//     newConfig.headers.Authorization = `Bearer ${token}`;

//     return newConfig;
//   },
//   error => Promise.reject(error),
// );

axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   store.dispatch(logout());
    //   store.dispatch(showErrorSnackbar('Unauthorized'));
    // }
    return Promise.reject(error);
  },
);

const objectToFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;
  const objectKeys = Object.keys(obj);

  objectKeys.forEach(property => {
    if (namespace) {
      formKey = `${namespace}[${property}]`;
    } else {
      formKey = property;
    }

    const value = obj[property];

    if (Array.isArray(value)) {
      // value is an Array
      arrayToFormData(fd, formKey, value); // eslint-disable-line no-use-before-define
    } else if (typeof value === 'object' && !(value instanceof File)) {
      // value is a nested object
      objectToFormData(value, fd, formKey);
    } else {
      // value is a string or a File object
      fd.append(formKey, value);
    }
  });

  return fd;
};

const arrayToFormData = (fd, formKey, value) => {
  value.forEach(a => {
    if (typeof a === 'object' && !(a instanceof File)) {
      // elements of array is nested object
      objectToFormData(value, fd, `${formKey}[]`);
    } else {
      // elements of array is string or File object
      fd.append(`${formKey}[]`, a);
    }
  });
};

const buildParam = (params, asJSON = true) => {
  if (asJSON) {
    return JSON.stringify(params);
  }
  return objectToFormData(params);
};

const getDefaultOptions = () => ({ method: 'GET', headers: {} });

function ajax(uri, options = {}) {
  let defaultOptions = getDefaultOptions();

  defaultOptions = {
    ...defaultOptions,
    method: options.method || defaultOptions.method,
  };

  if (options.data) {
    if (options.formData) {
      defaultOptions.data = buildParam(options.data, false);
      defaultOptions.headers['Content-Type'] = 'multipart/form-data';
    } else {
      defaultOptions.headers['Content-Type'] =
        'application/json; charset=UTF-8';
      defaultOptions.data = buildParam(options.data);
    }
  }

  defaultOptions.url = clientUrl(uri);

  return axios(defaultOptions).then(({ data }) => data);
}

export default ajax;

export async function attach(path, formData) {
  const token = await getToken('authToken');
  return axios.post(clientUrl(path), formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'multipart/form-data',
    },
  });
}
