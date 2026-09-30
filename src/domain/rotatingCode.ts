const JWT_PATTERN = /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+/;
const TOKEN_PARAMS = /(?:token|session|auth)=/i;

export function isLikelyRotatingCode(value: string): boolean {
  if (value.length === 0) return false;
  return JWT_PATTERN.test(value) || TOKEN_PARAMS.test(value);
}
