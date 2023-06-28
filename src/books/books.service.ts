import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import {
  Model,
  Connection,
  QueryWithHelpers,
  HydratedDocument,
} from 'mongoose';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public create(dto: CreateBookDto): Promise<BookDocument> {
    const book = new this.bookModel(dto);

    return book.save();
  }

  public getAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  public update(
    id: string,
    dto: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.bookModel.findOneAndUpdate({ _id: id }, dto);
  }

  public delete(
    id: string,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.bookModel.findOneAndRemove({ _id: id });
  }
}
