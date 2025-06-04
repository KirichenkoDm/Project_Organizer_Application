import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype, type }: ArgumentMetadata) {
    if (!metatype || type !== "body") {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map(err => {
        return `${err.property}: ${Object.values(err.constraints).join(', ')}`;
      }).join('; ');

      throw new BadRequestException(messages);
    }

    return value;
  }
}