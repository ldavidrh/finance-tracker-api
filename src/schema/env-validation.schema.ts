import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  DATABASE_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
  }),
  DATABASE_PORT: Joi.number().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
  }),
  DATABASE_USER: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
  }),
  DATABASE_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
  }),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^(\d+[smhd])$/)
    .default('1h'),
  JWT_EMAIL_CONFIRMATION_EXPIRES_IN: Joi.string().required(),
});
