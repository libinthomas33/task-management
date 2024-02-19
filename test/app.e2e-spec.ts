import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        // Mock TypeORM module
        TypeOrmModule.forRoot({
          type: 'sqlite', // Use an in-memory SQLite database for testing
          database: ':memory:',
          entities: [], // Provide empty array to prevent loading entities
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get the TypeORM connection and repository
    connection = moduleFixture.get<Connection>(Connection);
  });

  afterEach(async () => {
    // Close the TypeORM connection after each test
    await connection.close();
  });

  it('/ (GET)', () => {
    return supertest(app.getHttpServer()).get('/').expect(404);
  });
});
