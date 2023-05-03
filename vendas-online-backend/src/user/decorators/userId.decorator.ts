import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const {authorization} =  ctx.switchToHttp().getRequest().headers
        console.log(authorization)
        return 1
    }
  );