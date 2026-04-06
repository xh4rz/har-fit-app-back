import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class DatabaseExceptionService {
  private readonly logger = new Logger('DatabaseExceptionService');

  handleDBExceptions(error: any): never {
    //  sI ya es un error HTTP → lo relanzas
    if (error instanceof HttpException) {
      this.logger.error(error);
      throw error;
    }

    // Error de violación de constraint único (PostgreSQL)
    if (error.code === '23505') {
      const detail: string = error.detail || '';

      if (detail.includes('email')) {
        const match = detail.match(/\(email\)=\(([^)]+)\)/);
        const email = match?.[1] ?? null;
        throw new BadRequestException(`Email ${email} is already registered`);
      }

      throw new BadRequestException(detail);
    }

    // Error de violación de foreign key
    if (error.code === '23503') {
      throw new BadRequestException(
        error.detail || 'Foreign key constraint violation',
      );
    }

    // Error de violación de not null
    if (error.code === '23502') {
      throw new BadRequestException(
        error.detail || 'Not null constraint violation',
      );
    }

    // Log del error para debugging
    this.logger.error(error);

    // Error genérico
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
