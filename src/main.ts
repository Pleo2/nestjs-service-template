import 'reflect-metadata'

import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from '@/app/app.module'

const GLOBAL_PREFIX = 'api'
const SWAGGER_PATH = 'doc'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)

	app.setGlobalPrefix(GLOBAL_PREFIX)

	// Habilita la validación global
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	)

	const config = new DocumentBuilder()
		.setTitle('nestjs-template')
		.setDescription('nestjs-template API description')
		.setVersion('1.0')
		.addTag('nestjs-template')
		.build()

	const documentFactory = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup(
		`/${GLOBAL_PREFIX}/${SWAGGER_PATH}`,
		app,
		documentFactory,
	)

	const configService = app.get(ConfigService)
	const port = configService.get<string>('PORT', '3000')

	await app.listen(port, '0.0.0.0')

	const logger = app.get(Logger)
	const actualUrl = `http://localhost:${port}`
	logger.log(`App is ready and listening on port ${port} 🚀`)
	logger.log(`Swagger UI available at ${actualUrl}/${GLOBAL_PREFIX}/doc 📄`)
}

bootstrap().catch(handleError)

function handleError(error: unknown) {
	// eslint-disable-next-line no-console
	console.error(error)
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1)
}

process.on('uncaughtException', handleError)
