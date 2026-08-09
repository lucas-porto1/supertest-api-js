import Joi from 'joi';

const metadataSchema = Joi.object().unknown(true).optional();

export const loginResponseSchema = Joi.object({
  token: Joi.string().min(1).required(),
  _meta: metadataSchema,
}).required();

export const registerResponseSchema = Joi.object({
  id: Joi.number().integer().required(),
  token: Joi.string().min(1).required(),
  _meta: metadataSchema,
}).required();
