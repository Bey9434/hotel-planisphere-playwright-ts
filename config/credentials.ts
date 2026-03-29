const getEnv = (key: string): string => process.env[key] ?? "";

export const GENERAL_USER = {
  email: getEnv("GENERAL_USER_EMAIL"),
  password: getEnv("GENERAL_USER_PASSWORD"),
} as const;

export const PREMIUM_USER = {
  email: getEnv("PREMIUM_USER_EMAIL"),
  password: getEnv("PREMIUM_USER_PASSWORD"),
} as const;
