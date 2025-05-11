import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { BasicResponseDto } from "./dto/basic-response.dto";
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
        message = "message" in exceptionResponse 
          ? String(exceptionResponse["message"])
          : JSON.stringify(exceptionResponse);
      } else {
        message = String(exceptionResponse);
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody: BasicResponseDto = {
      message,
      status,
      isSuccess: false,
    };

    response.status(status).json(responseBody);
  }
}