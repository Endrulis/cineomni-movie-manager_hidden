import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { UpdateCurrentUserDto as UpdateCurrentUserDto } from 'src/current-user/dto';
import { CreateMovieDto, UpdateMovieDto } from 'src/movie/dto';

import { runSignupTests, runAuthenticationTests } from './auth';
import { getCurrentUserTest, updateCurrentUserTest } from './user/currentUser';
import {
  getEmptyMoviesTest,
  createMovieTest,
  getMoviesTest,
  getMovieByIdTest,
  updateMovieByIdTest,
  deleteMovieByIdTest,
} from './movie';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333/api');
  });

  afterAll(() => {
    prisma.cleanDb();
    app.close();
  });

  describe('App e2e tests', () => {
    const authDto: AuthDto = {
      email: 'test@gmail.com',
      password: 'Test123@',
    };
    describe('Auth', () => {
      describe('Signup', () => {
        runSignupTests(authDto);
      });
      describe('Signin', () => {
        runAuthenticationTests(authDto);
      });
    });
    describe('Current user', () => {
      describe('Get current user', () => {
        getCurrentUserTest(authDto);
      });
      describe('Update current user', () => {
        const updateCurrentUserDto: UpdateCurrentUserDto = {
          email: 'update@update.com',
          password: 'Test123#',
        };
        updateCurrentUserTest(updateCurrentUserDto);
      });
    });
    describe('Movies', () => {
      describe('Get empty movies', () => {
        getEmptyMoviesTest();
      });
      describe('Create movie', () => {
        const dto: CreateMovieDto = {
          title: 'First movie',
          description: 'Cool',
          link: 'movie.png',
        };
        createMovieTest(dto);
      });
      describe('Get movies', () => {
        getMoviesTest();
      });
      describe('Get movie by id', () => {
        getMovieByIdTest();
      });
      describe('Update movie by id', () => {
        const dto: UpdateMovieDto = {
          title: 'lets update it',
          description: 'updated movie',
        };
        updateMovieByIdTest(dto);
      });
      describe('Delete movie by id', () => {
        deleteMovieByIdTest();
      });
      describe('Get empty movies', () => {
        getEmptyMoviesTest();
      });
    });
  });
});
