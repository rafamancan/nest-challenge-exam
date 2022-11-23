import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  find(email: string) {
    try {
      return this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  create(input: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: input,
    });
  }
}
