import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';

const { apiKey } = getApiEnvironment();
const loginEndpoint = '/login';

export const postLogin = async (body) => {
  const response = await request
    .post(loginEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
};
