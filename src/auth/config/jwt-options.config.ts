import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('jwtOptions', () => {
  const configSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
  });

  const config = configSchema.validate(process.env, { stripUnknown: true });

  if (config.error) {
    throw new Error(
      `JWT Options config validation error: ${config.error.message}`,
    );
  }

  return config.value;
});
