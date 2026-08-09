import Joi from 'joi';
import { expect } from 'chai';
import { postRegister } from '../../endpoints/auth/register.js';
import { createAuthPayload } from '../../test-data/requests/auth.payloads.js';
import { authErrorResponses } from '../../test-data/responses/expected/auth.responses.js';
import { registerResponseSchema } from '../../test-data/responses/schemas/auth.schemas.js';
import { getTestUser } from '../../config/environment.js';

describe('Registration', function () {
  it('returns an id and token for a defined user', async function () {
    const payload = createAuthPayload(getTestUser());
    const response = await postRegister(payload);

    expect(response.status).to.equal(200);
    Joi.assert(response.body, registerResponseSchema);
  });

  it('rejects an unknown user', async function () {
    const payload = createAuthPayload({
      email: 'unknown.user@example.com',
      password: 'test-password',
    });
    const response = await postRegister(payload);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal(authErrorResponses.unknownUser);
  });

  it('requires an email', async function () {
    const { password } = getTestUser();
    const response = await postRegister(createAuthPayload({ password }));

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal(authErrorResponses.missingEmail);
  });

  it('requires a password', async function () {
    const { email } = getTestUser();
    const response = await postRegister(createAuthPayload({ email }));

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal(authErrorResponses.missingPassword);
  });
});
