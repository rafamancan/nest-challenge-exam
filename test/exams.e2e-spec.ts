import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('ExamController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/exams (GET)', () => {
    return request(app.getHttpServer()).get('/exams').expect(200);
  });

  it('/exams (POST) POSITIVE', () => {
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
    return request(app.getHttpServer())
      .post('/exams')
      .send(examExample)
      .expect(201, {
        codigo_amostra: fakeCode,
        resultado: 'Positivo',
      });
  });

  
  it('/exams (POST) NEGATIVE', () => {
    const fakeCode = faker.datatype
      .number({
        min: 0,
        max: 99999999,
      })
      .toString();
    const examExample = {
      codigo_amostra: fakeCode,
      cocaina: 0.001,
      anfetamina: 0.001,
      metanfetamina: 0.001,
      mda: 0.1,
      mdma: 0.1,
      thc: 0.001,
      morfina: 0.1,
      codeina: 0.1,
      heroina: 0.1,
      benzoilecgonina: 0.1,
      cocaetileno: 0.1,
      norcocaina: 0.1,
    };
    return request(app.getHttpServer())
      .post('/exams')
      .send(examExample)
      .expect(201, {
        codigo_amostra: fakeCode,
        resultado: 'Negativo',
      });
  });

  it('/exams (POST) 400', () => {
    const examExample = {
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
    return request(app.getHttpServer())
      .post('/exams')
      .send(examExample)
      .expect(400, {
        statusCode: 400,
        message: 'Dados da amostra inválido',
        error: 'Bad Request',
      });
  });

  it('/exams (POST) 409', () => {
    const examExample = {
      codigo_amostra: '123456',
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
    request(app.getHttpServer()).post('/exams').send(examExample).expect(201);
    return request(app.getHttpServer())
      .post('/exams')
      .send(examExample)
      .expect(409, {
        statusCode: 409,
        message: 'Já existe um exame com este código de amostra',
        error: 'Conflict',
      });
  });
});
