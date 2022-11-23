import { Module } from '@nestjs/common';
import { ExamController } from './exams.controller';
import { ExamService } from './exams.service';
import { ExamRepository } from './repositories';

@Module({
  controllers: [ExamController],
  providers: [ExamRepository, ExamService],
})
export class ExamModule {}
