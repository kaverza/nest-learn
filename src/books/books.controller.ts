import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.types';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/')
  public getBooks(): Book[] {
    return this.booksService.books;
  }
}
