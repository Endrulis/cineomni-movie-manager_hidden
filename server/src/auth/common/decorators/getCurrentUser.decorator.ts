/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetCurrentUser = createParamDecorator(
  (data: undefined | string, executionContext: ExecutionContext) => {
    const request: Express.Request = executionContext
      .switchToHttp()
      .getRequest();
    const user = request.user as User;
    if (data) {
      return user[data];
    }
    return user;
  },
);
