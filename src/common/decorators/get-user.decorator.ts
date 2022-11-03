import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LeanTeacher } from 'src/modules/teacher/interfaces/teacher.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LeanTeacher => {
    const request = ctx.switchToHttp().getRequest();

    return request.teacher as LeanTeacher;
  },
);