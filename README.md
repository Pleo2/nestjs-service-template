<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/nestjs.png" alt="Nest Logo" width="512" /></a>
</p>

<h1 align="center">⭐ NestJS Service Template ⭐</h1>

<p align="center">
  Template for new services based on NestJS with the Best Practices and Ready for Production
</p>

<p align="center">
  <a href="https://github.com/AlbertHernandez/nestjs-service-template/actions/workflows/node.yml?branch=main"><img src="https://github.com/AlbertHernandez/nestjs-service-template/actions/workflows/node.yml/badge.svg?branch=main" alt="nodejs"/></a>
  <a href="https://nodejs.org/docs/latest-v22.x/api/index.html"><img src="https://img.shields.io/badge/node-22.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-9.x-red.svg" alt="pnpm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Test-Vitest_-yellow.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>

## 🌟 What is including this template?

1. 🐳 Fully dockerized service ready for development and production environments with the best practices for docker, trying to provide a performance and small image just with the code we really need in your environments.
2. 👷 Use [SWC](https://swc.rs/) for compiling and running the tests of the service. As commented in the own [NestJS docs](https://docs.nestjs.com/recipes/swc), this is approximately x20 times faster than default typescript compiler that is the one that comes by default in NestJS.
3. ⚡️ Use [Fastify](https://fastify.dev/) as Web Framework. By default, [NestJS is using Express](https://docs.nestjs.com/techniques/performance) because is the most widely-used framework for working with NodeJS, however, this does not imply is the one is going to give us the most performance. Also, NestJS is fully compatible with Fastify, so we are providing this integration by default. You can check [here](https://github.com/fastify/benchmarks#benchmarks) comparison between different web frameworks [comparativa de express](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/).

4. 🐶 Integration with [husky](https://typicode.github.io/husky/) to ensure we have good quality and conventions while we are developing like:
    - 💅 Running the linter over the files that have been changed
    - 💬 Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure our commits have a convention.
    - ✅ Run the tests automatically.
    - ⚙️ Check our project does not have type errors with Typescript.
    - 🙊 Check typos to ensure we don't have grammar mistakes.
5. 🗂️ Separate tests over production code. By default, NestJS is combining in the same folder, the `src`, the unit tests and the code we are developing for production. This is something I personally don't like so here I am separating this and having a dedicated folder for the unit tests.
6. 🧪 Testing with [Vitest](https://vitest.dev/) and [supertest](https://github.com/ladjs/supertest) for unit and e2e tests.
7. 🏎️ Performance testing using [k6](https://grafana.com/oss/k6/).
8. 🤜🤛 Combine unit and e2e test coverage. In the services we may have both type of tests, unit and e2e tests, and usually we would like to see what is the combined test coverage, so we can see the full picture.
9. 📌 Custom path aliases, where you can define your own paths (you will be able to use imports like `@/shared/logger` instead of `../../../src/shared/logger`).
10. 🚀 CI/CD using GitHub Actions, helping ensure a good quality of our code and providing useful insights about dependencies, security vulnerabilities and others.
11. 🐦‍🔥 Usage of ESModules instead of CommonJS, which is the standard in JavaScript.
12. 📦 Use of [pnpm](https://pnpm.io/) as package manager, which is faster and more efficient than npm or yarn.
13. 🔑 Environment variable validation with [Joi](https://github.com/hapijs/joi). How does it work in your code? In app.module.ts, you import ConfigModule.forRoot and pass your Joi validationSchema. When the app starts, NestJS validates the environment variables using that schema. If any required variable is missing or there is an invalid value, the app will not start and will show you an error.

## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

Now, we will need to install `pnpm` globally, you can do it running:

```bash
npm install -g pnpm@9.14.2
```

The project is fully dockerized 🐳, if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up -d my-service-dev
```

This development mode will work with **hot-reload** and expose a **debug port**, port `9229`, so later we can connect to it from our editor.

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following configuration:

```json
{
	"version": "0.1.0",
	"configurations": [
		{
			"type": "node",
			"request": "attach",
			"name": "Attach to docker",
			"restart": true,
			"port": 9229,
			"remoteRoot": "/app"
		}
	]
}
```

Also, if you want to run the **production mode**, you can run:

```bash
docker-compose up -d my-service-production
```

This service is providing just a health endpoint which you can call to verify the service is working as expected:

```bash
curl --request GET \
  --url http://localhost:3000/health
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
node --run build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
node --run test
```

If you are interested just in the unit tests, you can run:

```bash
node --run test:unit
```

Or if you want e2e tests, you can execute:

```bash
node --run test:e2e
```

We also have performance testing with [k6](https://k6.io/), if you want to run it via docker, execute:

```bash
docker-compose up k6
```

Or if you want to run it from your machine, execute:

```bash
brew install k6
node --run test:performance
```

## 💅 Linting

To run the linter you can execute:

```bash
node --run lint
```

And for trying to fix lint issues automatically, you can run:

```bash
node --run lint:fix
```
