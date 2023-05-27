import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN,
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3333);

  const prismaService = app.get(PrismaService);

  // prismaService.cleanDb();
  // console.log("DB cleaned");

  await prismaService.enableShutdownHooks(app);
}

bootstrap();
