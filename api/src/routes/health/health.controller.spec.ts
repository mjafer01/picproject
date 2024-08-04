import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { HealthController } from './health.controller';

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let healthController: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    healthController = module.get<HealthController>(HealthController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('/health (GET)', () => {
    it('should return 200 and health status', async () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body).toEqual({
            status: 'ok',
            timestamp: expect.any(String),
            version: '1.0.0',
          });
          expect(new Date(res.body.timestamp)).toBeInstanceOf(Date);
        });
    });
  });
});
