import type { Roles } from '@/types/global.d';
import type { JwtPayload } from '@clerk/types';

export const checkRole = async (role: Roles, sessionClaims: JwtPayload | null) => {
  return sessionClaims?.metadata.role === role;
};
