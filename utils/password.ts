import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");

  return `${ITERATIONS}:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedValue: string) {
  const [iterations, salt, hash] = storedValue.split(":");
  const expected = Buffer.from(hash, "hex");
  const actual = pbkdf2Sync(
    password,
    salt,
    Number(iterations),
    expected.length,
    DIGEST,
  );

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
