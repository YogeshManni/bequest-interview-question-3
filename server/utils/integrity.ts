import crypto from "crypto";

/**
 * Generates a hash for a given string.
 * @param data - The input data string to hash.
 * @returns A SHA-256 hash of the input data.
 */
export const generateHash = (data: string): string => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

/**
 * Verifies if the given data matches the stored hash.
 * @param data - The input data string to verify.
 * @param storedHash - The hash to compare against.
 * @returns True if the data matches the hash, false otherwise.
 */
export const verifyHash = (data: string, storedHash: string): boolean => {
  return generateHash(data) === storedHash;
};
