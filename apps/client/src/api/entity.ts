// eslint-disable-next-line import/no-named-as-default
import fetchCreator from './fetchCreator';

const API_URL = '/api';

const buildUrl = (path: string) => `${API_URL}/${path}`;

export const getAll = async (path: string) => {
  const url = buildUrl(path);
  return fetchCreator(url, 'GET', false);
};

export const getOne = async (path: string) => {
  const url = buildUrl(path);
  return fetchCreator(url, 'GET', true);
};

export const createOne = async (
  path: string,
  body: any,
) => {
  const url = buildUrl(path);
  return fetchCreator(
    url,
    'POST',
    false,
    JSON.stringify(body),
  );
};

export const updateOne = async (
  path: string,
  body: any,
) => {
  const url = buildUrl(path);
  return fetchCreator(
    url,
    'PUT',
    false,
    JSON.stringify(body),
  );
};

export const deleteOne = async (path: string) => {
  const url = buildUrl(path);
  return fetchCreator(url, 'DELETE', true);
};

export const request = async (
  path: string,
  method: string,
  body?: any,
  headers?: any,
) => {
  const url = buildUrl(path);
  return fetchCreator(
    url,
    method,
    true,
    JSON.stringify(body),
    headers,
  );
};
