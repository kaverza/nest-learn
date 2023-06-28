import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  authors: string;

  @IsBoolean()
  @IsOptional()
  favorite: boolean;

  @IsString()
  @IsOptional()
  fileCover: string;

  @IsString()
  @IsOptional()
  fileName: string;

  @IsString()
  @IsOptional()
  fileBook: string;
}
