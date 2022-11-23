import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { yupCreateExamInput } from '../../yup/exams';
import { ExamService } from './exams.service';
import { CreateExamInput } from './dto/exam';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/exams')
  async createExam(@Body() input: CreateExamInput) {
    // Utiliza um schema yup para verificar o input
    const isValidInput = yupCreateExamInput.isValidSync(input);

    // Caso seja inválido, retorna erro 400
    if (!isValidInput) {
      throw new BadRequestException('Dados da amostra inválido');
    }

    return this.examService.createExam(input);
  }

  @Get('/exams')
  async getAll() {
    return this.examService.getAll();
  }
}
