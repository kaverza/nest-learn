import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksService', () => {
  let service: BooksService;
  const BOOK_MOCK: Book = {
    title: 'title',
    authors: 'authors',
    description: 'description',
    favorite: false,
    fileBook: 'fileBook',
    fileCover: 'fileCover',
    fileName: 'fileCover',
  };

  class MockBookRepository {
    save() {
      return BOOK_MOCK;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: MockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', () => {
    const result = service.create(BOOK_MOCK);

    expect(result).toStrictEqual(BOOK_MOCK);
  });
});
