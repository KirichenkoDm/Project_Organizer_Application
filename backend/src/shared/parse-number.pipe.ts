import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseNumberPipe implements PipeTransform<string, number> {
  transform(value: string, {data}: ArgumentMetadata): number {

    const num = Number(value);
    if (!Number.isInteger(num)) {
      throw new BadRequestException(`Parameter ${data} must be a number`);
    }

    return num;
  }
}