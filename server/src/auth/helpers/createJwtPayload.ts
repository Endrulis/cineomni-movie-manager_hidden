import { JwtPayload } from '../types';

export const createJwtPayload = (
  userId: number,
  email: string,
  role: string,
): JwtPayload => ({
  sub: userId,
  email: email,
  role: role,
});
