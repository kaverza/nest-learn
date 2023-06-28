import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './interfaces/dto/create-book';
import { IParamId } from 'src/types';
import { UpdateBookDto } from './interfaces/dto/update-book';
import { QueryWithHelpers, HydratedDocument } from 'mongoose';
import { ExceptionsInterceptor } from 'src/interceptors/exceptions.interceptor';
import { LengthValidataionPipe } from 'src/pipes/length.validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@UseInterceptors(ExceptionsInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/')
  public getBooks(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Post('/')
  public create(
    @Body(new LengthValidataionPipe('title', 2, 300)) body: CreateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ): QueryWithHelpers<
    HydratedDocument<BookDocument, {}, {}> | null,
    HydratedDocument<BookDocument, {}, {}>,
    {},
    BookDocument
  > {
    return this.booksService.delete(id);
  }
}
