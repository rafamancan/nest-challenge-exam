import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma';

@Injectable()
export class ExamRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.exam.findMany();
  }

  findByUnique(input: Prisma.ExamWhereUniqueInput) {
    return this.prismaService.exam.findUnique({
      where: input,
    });
  }

  create(input: Prisma.ExamCreateInput) {
    return this.prismaService.exam.create({
      data: input,
    });
  }
}
