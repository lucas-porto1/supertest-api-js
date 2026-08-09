import Joi from 'joi';
import { expect } from 'chai';
import { getUserById, getUsers, postUser } from '../../endpoints/users/users.js';
import { createUserPayload } from '../../test-data/requests/user.payloads.js';
import {
  createdUserResponseSchema,
  singleUserResponseSchema,
  usersListResponseSchema,
} from '../../test-data/responses/schemas/users.schemas.js';

describe('Users', function () {
  it('returns a paginated list of users', async function () {
    const response = await getUsers({ page: 2 });

    expect(response.status).to.equal(200);
    expect(response.body.page).to.equal(2);
    Joi.assert(response.body, usersListResponseSchema);
  });

  it('returns a user by id', async function () {
    const userId = 2;
    const response = await getUserById(userId);

    expect(response.status).to.equal(200);
    expect(response.body.data.id).to.equal(userId);
    Joi.assert(response.body, singleUserResponseSchema);
  });

  it('creates a user with customized data', async function () {
    const payload = createUserPayload({
      job: 'QA Lead',
      address: {
        city: 'Sao Paulo',
      },
    });
    const response = await postUser(payload);

    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      name: payload.name,
      job: payload.job,
      email: payload.email,
      department: payload.department,
      active: payload.active,
    });
    expect(response.body.skills).to.deep.equal(payload.skills);
    expect(response.body.address).to.deep.equal(payload.address);
    Joi.assert(response.body, createdUserResponseSchema);
  });

  it('returns 404 for an unknown user', async function () {
    const response = await getUserById(999_999);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({});
  });
});
