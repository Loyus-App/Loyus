// Domain logic — zero react-native / expo imports (ARCH-02)

const JWT_PATTERN = /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+/;
const TOKEN_PARAMS = /(?:token|session|auth)=/i;

/** Returns true if the scanned value looks like a rotating/temporary code (JWT, session token, etc.) */
export function isLikelyRotatingCode(value: string): boolean {
  if (value.length === 0) return false;
  return JWT_PATTERN.test(value) || TOKEN_PARAMS.test(value);
}
