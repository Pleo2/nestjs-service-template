import Joi from 'joi'

export const validationSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'production', 'test')
		.default('development'),
	PORT_DEV: Joi.number().default(3002),
	PORT_PROD: Joi.number().default(3001),
	// DATABASE_URL: Joi.string().uri().required(),
	// JWT_SECRET: Joi.string().required(),
	// API_KEY: Joi.string().required(),
}).unknown(true)
