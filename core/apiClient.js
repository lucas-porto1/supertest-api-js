import supertest from 'supertest';
import { getApiEnvironment } from '../config/environment.js';

const { baseUrl } = getApiEnvironment();

export const request = supertest(baseUrl);
