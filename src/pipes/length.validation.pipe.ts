import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateBookDto } from "src/books/interfaces/dto/create-book";

@Injectable()
export class LengthValidataionPipe implements PipeTransform {
    constructor(
        private filed: keyof CreateBookDto, 
        private minLength: number, 
        private maxLength: number
    ) {}

    transform(dto: CreateBookDto) {
        const value = dto[this.filed];
        if (typeof value === 'string') {
            if (value.length < this.minLength) {
                throw new BadRequestException(`Минимальная длинна ${this.filed}: ${this.minLength}`)
            }
    
            if (value.length > this.maxLength) {
                throw new BadRequestException(`Максимальная длинна ${this.filed}: ${this.maxLength}`)
            }
        }

        return dto;
    }
}