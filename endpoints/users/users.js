import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';

const { apiKey } = getApiEnvironment();
const usersEndpoint = '/users';

export const getUsers = async (query = {}) => {
  const response = await request
    .get(usersEndpoint)
    .set('x-api-key', apiKey)
    .query(query)
    .accept('application/json');

  return response;
};

export const getUserById = async (id) => {
  const response = await request
    .get(`${usersEndpoint}/${id}`)
    .set('x-api-key', apiKey)
    .accept('application/json');

  return response;
};

export const postUser = async (body) => {
  const response = await request
    .post(usersEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
};
