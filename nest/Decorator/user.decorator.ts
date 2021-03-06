import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data, ctx: ExecutionContext): ParameterDecorator => {
   const request = ctx.switchToHttp().getRequest();
   return request.login;
});