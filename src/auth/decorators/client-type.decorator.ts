import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ClientTypeValue } from '../interfaces';

export const ClientType = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ClientTypeValue => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const clientType = req.headers['x-client-type'];

    if (clientType === 'mobile') {
      return 'mobile';
    }

    return 'web';
  },
);
