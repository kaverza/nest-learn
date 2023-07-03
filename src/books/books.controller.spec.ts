import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('BooksController', () => {
  let app: INestApplication;
  let controller: BooksController;
  const booksService = {
    create: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    controller = module.get<BooksController>(BooksController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it(`/GET /books`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(booksService.getAll);
  });

  it(`/POST /books`, () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(201)
      .expect(booksService.create);
  });

  it(`/POST /books`, () => {
    return request(app.getHttpServer())
      .put('/books/1')
      .send({ title: 'title' })
      .expect(200)
      .expect(booksService.update);
  });

  it(`/POST /books`, () => {
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect(booksService.delete);
  });
});
