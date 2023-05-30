import { Injectable } from '@nestjs/common';
import { Book } from './books.types';

@Injectable()
export class BooksService {
  public books: Book[] = [];
}
