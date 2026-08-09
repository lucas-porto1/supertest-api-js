import Joi from 'joi';

const metadataSchema = Joi.object().unknown(true).optional();

const userSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().min(1).required(),
  last_name: Joi.string().min(1).required(),
  avatar: Joi.string().uri().required(),
}).required();

const supportSchema = Joi.object({
  url: Joi.string().uri().required(),
  text: Joi.string().min(1).required(),
}).required();

const createdUserAddressSchema = Joi.object({
  city: Joi.string().min(1).required(),
  country: Joi.string().min(1).required(),
}).required();

export const usersListResponseSchema = Joi.object({
  page: Joi.number().integer().positive().required(),
  per_page: Joi.number().integer().positive().required(),
  total: Joi.number().integer().min(0).required(),
  total_pages: Joi.number().integer().min(0).required(),
  data: Joi.array().items(userSchema).min(1).required(),
  support: supportSchema,
  _meta: metadataSchema,
}).required();

export const singleUserResponseSchema = Joi.object({
  data: userSchema,
  support: supportSchema,
  _meta: metadataSchema,
}).required();

export const createdUserResponseSchema = Joi.object({
  name: Joi.string().min(1).required(),
  job: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  department: Joi.string().min(1).required(),
  active: Joi.boolean().required(),
  skills: Joi.array().items(Joi.string().min(1)).min(1).required(),
  address: createdUserAddressSchema,
  id: Joi.string().min(1).required(),
  createdAt: Joi.string().isoDate().required(),
  _meta: metadataSchema,
}).required();
