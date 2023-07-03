import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model, QueryWithHelpers, HydratedDocument } from 'mongoose';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

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
