import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exams.controller';
import { ExamService } from './exams.service';
import { faker } from '@faker-js/faker';

describe('ExamController', () => {
  let controller: ExamController;
  const mockExamService = {
    createExam: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [ExamService],
    })
      .overrideProvider(ExamService)
      .useValue(mockExamService)
      .compile();

    controller = module.get<ExamController>(ExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an exam', async () => {
    const fakeCode = faker.datatype
      .number({
        min: 0,
        max: 99999999,
      })
      .toString();
    const examExample = {
      codigo_amostra: fakeCode,
      cocaina: 0.678,
      anfetamina: 0.1,
      metanfetamina: 0.1,
      mda: 0.1,
      mdma: 0.1,
      thc: 0.1,
      morfina: 0.1,
      codeina: 0.1,
      heroina: 0.1,
      benzoilecgonina: 0.1,
      cocaetileno: 0.1,
      norcocaina: 0.1,
    };
    expect(controller.createExam(examExample)).resolves.toEqual(examExample);
    expect(mockExamService.createExam).toHaveBeenCalledWith(examExample);
  });
});
