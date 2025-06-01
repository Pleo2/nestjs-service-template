import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HealthModule } from '@/app/health/health.module'

import { LoggerModule } from '@/shared/logger/logger.module'

import { UserModule } from '@/contexts/users/user.module'

import { validationSchema } from '../config/env-validator.schema'
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
			validationSchema: validationSchema,
			validationOptions: {
				abortEarly: false,
				allowUnknown: true,
			},
		}),
		LoggerModule,
		HealthModule,
		UserModule,
	],
})
export class AppModule {}
