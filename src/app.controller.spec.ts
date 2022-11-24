import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { PrismaService } from './modules/prisma';
import { UserRepository } from './modules/users/repositories';
import { UsersService } from './modules/users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthService,
        UsersService,
        JwtService,
        UserRepository,
        PrismaService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a message', () => {
      expect(appController.welcome()).resolves.toBe(
        'Welcome to the NestJS Challenge Exam 😁',
      );
    });
  });
});
