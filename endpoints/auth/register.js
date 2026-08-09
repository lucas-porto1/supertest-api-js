import { getApiEnvironment } from '../../config/environment.js';
import { request } from '../../core/apiClient.js';

const { apiKey } = getApiEnvironment();
const registerEndpoint = '/register';

export const postRegister = async (body) => {
  const response = await request
    .post(registerEndpoint)
    .set('x-api-key', apiKey)
    .send(body)
    .accept('application/json');

  return response;
};
