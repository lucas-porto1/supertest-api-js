export function createAuthPayload({ email, password } = {}) {
  return {
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
  };
}
