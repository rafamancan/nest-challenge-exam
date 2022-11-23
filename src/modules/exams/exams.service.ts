import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateExamInput } from './dto/exam';
import { ExamRepository } from './repositories';

@Injectable()
export class ExamService {
  constructor(private readonly examRepository: ExamRepository) {}

  async getAll(): Promise<any> {
    const allExams = await this.examRepository.findAll();
    const allExamsWithResult = [];
    allExams.forEach((exam) => {
      allExamsWithResult.push({
        ...exam,
        resultado: exam.resultado ? 'Positivo' : 'Negativo',
      });
    });
    return allExamsWithResult;
  }

  async createExam(input: CreateExamInput): Promise<any> {
    // Busca no banco de dados algum exame com o mesmo código de amostra
    const foundByCode = await this.examRepository.findByUnique({
      codigo_amostra: input.codigo_amostra,
    });

    // Case exista, retorna erro 409
    if (foundByCode) {
      throw new ConflictException(
        'Já existe um exame com este código de amostra',
      );
    }

    try {
      // Retorna o exame criado
      const exam = this.sanitizeExamInput(input);

      const examRating = await this.rateExam(exam);
      const examStored = await this.examRepository.create(examRating);
      return {
        codigo_amostra: examStored.codigo_amostra,
        resultado: examStored.resultado ? 'Positivo' : 'Negativo',
      };
    } catch {
      throw new InternalServerErrorException();
    }
  }

  sanitizeExamInput(input: CreateExamInput): CreateExamInput {
    // multiplica por 1000 para evitar pontos flutuantes entre linguagens
    Object.keys(input).forEach((item) => {
      if (typeof input[item] === 'number') {
        input[item] = input[item] * 1000;
      }
    });

    return input;
  }

  async rateExam(exam: any): Promise<any> {
    // Simula a avaliação do exame
    const examLimits = {
      anfetamina: 200,
      metanfetamina: 200,
      mda: 200,
      mdma: 200,
      thc: 50,
      morfina: 200,
      codeina: 200,
      heroina: 200,
    };

    const cocaineLimit = {
      cocaina: 500,
      benzoilecgonina: 50,
      cocaetileno: 50,
      norcocaina: 50,
    };

    // verificar notas de corte do exame
    let resultado = false;
    Object.keys(exam).forEach((item) => {
      if (examLimits[item] && exam[item] >= examLimits[item]) {
        resultado = true;
      }
    });

    // verifica notas de corte para cocaina
    if (!resultado && exam.cocaina >= cocaineLimit.cocaina) {
      Object.keys(exam).forEach((item) => {
        if (cocaineLimit[item] && exam[item] >= cocaineLimit[item]) {
          resultado = true;
        }
      });
    }

    // Retorna o exame com avaliação
    return {
      ...exam,
      resultado,
    };
  }
}
