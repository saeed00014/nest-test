import { applyDecorators, SetMetadata } from '@nestjs/common';

export const Auth = (role: string[]) => {
  return applyDecorators(SetMetadata('role', role));
};
