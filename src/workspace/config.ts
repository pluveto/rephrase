import { config as configEnv } from "dotenv";

configEnv();

export function getEnv(key: string, defaultValue: string = ""): string {
  return (
    process.env[key.toUpperCase()] ||
    process.env[key.toLowerCase()] ||
    defaultValue
  );
}

export function mustGetEnv(key: string): string {
  const value = getEnv(key);
  if (value === "") {
    throw new Error(`Missing env config ${key}`);
  }
  return value;
}
