import Joi from 'joi';
import { expect } from 'chai';
import { postLogin } from '../../endpoints/auth/login.js';
import { createAuthPayload } from '../../test-data/requests/auth.payloads.js';
import { loginResponseSchema } from '../../test-data/responses/schemas/auth.schemas.js';
import { getTestUser } from '../../config/environment.js';

describe('Login', function () {
  it('returns a token for valid credentials', async function () {
    const response = await postLogin(createAuthPayload(getTestUser()));

    expect(response.status).to.equal(200);
    Joi.assert(response.body, loginResponseSchema);
  });
});
