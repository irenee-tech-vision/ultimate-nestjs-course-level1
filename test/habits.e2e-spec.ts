import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { DbType } from '../src/db-type.enum';
import { HabitsModule } from '../src/habits/habits.module';
import { CoreModule } from '../src/core/core.module';
import { MongoClient } from 'mongodb';
import { inMemoryMongoDB } from './in-memory-mongodb';
import { MONGO_CLIENT_TOKEN } from '../src/mongo-connection/constants';
import { AppModule } from '../src/app.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../src/auth/guards/auth/auth.guard';

describe('HabitsController', () => {
  describe('with in-memory db', () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          AppModule.register({
            appDataDb: DbType.IN_MEMORY,
            appAnalyticsDb: DbType.IN_MEMORY,
          }),
        ],
      })
        .overrideProvider(AuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    describe('GET /habits', () => {
      it('should returns an array of habits', () => {
        return request(app.getHttpServer())
          .get('/habits')
          .expect(200)
          .expect((res) => {
            expect(res.body.length).toBeGreaterThanOrEqual(0);
          });
      });

      it('should return one habit when the `limit` query parameter is set to `1`', () => {
        return request(app.getHttpServer())
          .get('/habits?limit=1')
          .expect(200)
          .expect((res) => {
            expect(res.body.length).toBe(1);
          });
      });

      it('should return a sorted array of habits when the `sortBy` query parameter is passed', () => {
        return request(app.getHttpServer())
          .get('/habits?sortBy=name')
          .expect(200)
          .expect((res) => {
            expect(res.body[0].name <= res.body[1].name).toBe(true);
          });
      });
    });

    describe('GET /habits/:id', () => {
      const habitId = 1741904578050; // Taken from the `fixture/seed-data.json` file

      it('should return a habit by id', () => {
        return request(app.getHttpServer())
          .get(`/habits/${habitId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.id).toBe(habitId);
          });
      });

      it('should return a 404 when the habit does not exist', () => {
        return request(app.getHttpServer()).get('/habits/0').expect(404);
      });
    });
  });

  describe('with mongo db', () => {
    let app: INestApplication<App>;
    let client: MongoClient;

    beforeAll(async () => {
      const uri = await inMemoryMongoDB.connect();
      client = new MongoClient(uri);

      await client.db().collection('habits').deleteMany({});
      await client
        .db()
        .collection('habits')
        .insertMany([
          {
            name: 'Go for walks',
            description: 'every day',
            habitId: 1742645612854,
            createdAt: new Date('2025-03-22T12:13:32.854Z'),
            updatedAt: new Date('2025-03-22T12:13:32.854Z'),
          },
          {
            name: 'Read books',
            description: 'every week',
            habitId: 1742645612855,
            createdAt: new Date('2025-03-23T12:13:32.854Z'),
            updatedAt: new Date('2025-03-23T12:13:32.854Z'),
          },
          {
            name: 'Exercise',
            description: 'every morning',
            habitId: 1742645612856,
            createdAt: new Date('2025-03-24T12:13:32.854Z'),
            updatedAt: new Date('2025-03-24T12:13:32.854Z'),
          },
          {
            name: 'Meditate',
            description: 'every evening',
            habitId: 1742645612857,
            createdAt: new Date('2025-03-25T12:13:32.854Z'),
            updatedAt: new Date('2025-03-25T12:13:32.854Z'),
          },
        ]);

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
          AppModule.register({
            appDataDb: DbType.MONGO,
            appAnalyticsDb: DbType.IN_MEMORY,
          }),
        ],
      })
        .overrideProvider(MONGO_CLIENT_TOKEN)
        .useValue(client)
        .overrideProvider(AuthGuard)
        .useValue({ canActivate: () => true })
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();

      await client.close();
      await inMemoryMongoDB.disconnect();
    });

    describe('GET /habits', () => {
      it('should returns an array of habits', () => {
        return request(app.getHttpServer())
          .get('/habits')
          .expect(200)
          .expect((res) => {
            expect(res.body.length).toBeGreaterThanOrEqual(0);
          });
      });

      it('should return one habit when the `limit` query parameter is set to `1`', () => {
        return request(app.getHttpServer())
          .get('/habits?limit=1')
          .expect(200)
          .expect((res) => {
            expect(res.body.length).toBe(1);
          });
      });

      it('should return a sorted array of habits when the `sortBy` query parameter is passed', () => {
        return request(app.getHttpServer())
          .get('/habits?sortBy=name')
          .expect(200)
          .expect((res) => {
            expect(res.body[0].name <= res.body[1].name).toBe(true);
          });
      });
    });

    describe('GET /habits/:id', () => {
      const habitId = 1742645612854;

      it('should return a habit by id', () => {
        return request(app.getHttpServer())
          .get(`/habits/${habitId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.id).toBe(habitId);
          });
      });

      it('should return a 404 when the habit does not exist', () => {
        return request(app.getHttpServer()).get('/habits/0').expect(404);
      });
    });
  });
});

