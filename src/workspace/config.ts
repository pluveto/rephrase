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

export const dbOptions = {
  type: mustGetEnv("DB_TYPE") as any,
  host: mustGetEnv("DB_HOST"),
  port: parseInt(mustGetEnv("DB_PORT")),
  username: mustGetEnv("DB_USERNAME"),
  password: mustGetEnv("DB_PASSWORD"),
  database: mustGetEnv("DB_DATABASE"),
};
