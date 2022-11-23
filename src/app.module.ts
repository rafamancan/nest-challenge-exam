import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma';
import { ExamModule } from './modules/exams/exams.module';

@Module({
  imports: [PrismaModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
