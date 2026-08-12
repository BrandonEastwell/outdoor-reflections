import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConsoleLogger} from "@nestjs/common";
import {ZodValidationPipe} from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Reflections API',
      logLevels: ['error', 'warn', 'log', 'debug'],
    }),
  });

  app.useGlobalPipes(new ZodValidationPipe())
  await app.listen(8000);
}
bootstrap();
