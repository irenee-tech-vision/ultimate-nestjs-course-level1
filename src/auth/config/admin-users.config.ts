import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('adminUsers', () => {
  const configSchema = Joi.object({
    SUPER_USER_API_KEY: Joi.string().optional().default('1234567890'),
    SUPER_USER_EMAIL: Joi.string().optional(),
    SUPER_USER_NAME: Joi.string().optional(),
    SYSTEM_USER_API_KEY: Joi.string().optional().default('ABCDEFGHIJ'),
    SYSTEM_USER_EMAIL: Joi.string().optional(),
    SYSTEM_USER_NAME: Joi.string().optional(),
    SUPPORT_USER_API_KEY: Joi.string().optional().default('abcdefghij'),
    SUPPORT_USER_EMAIL: Joi.string().optional(),
    SUPPORT_USER_NAME: Joi.string().optional(),
  });

  const config = configSchema.validate(process.env, { stripUnknown: true });

  if (config.error) {
    throw new Error(
      `Admin Users config validation error: ${config.error.message}`,
    );
  }

  return config.value;
});
