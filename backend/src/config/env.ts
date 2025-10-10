function required(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

export const ENV = {
  PORT: Number(process.env.PORT || 3000),
  ML_CLIENT_ID: required('ML_CLIENT_ID'),
  ML_CLIENT_SECRET: required('ML_CLIENT_SECRET'),
  ML_REDIRECT_URI: required('ML_REDIRECT_URI'),
};
