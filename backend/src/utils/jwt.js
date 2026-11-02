// Reads a JWT's payload WITHOUT verifying it. Only for diagnostics, never for trust decisions.
export function decodeJwt(token) {
  try {
    return JSON.parse(Buffer.from(String(token).split('.')[1], 'base64url').toString('utf8'));
  } catch { return null; }
}
