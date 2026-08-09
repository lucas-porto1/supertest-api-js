import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and provide a value.`,
    );
  }

  if (value.startsWith('replace-with-')) {
    throw new Error(`Environment variable ${name} still contains its placeholder value.`);
  }

  return value;
}

export function getApiEnvironment() {
  return {
    baseUrl: requireEnvironmentVariable('BASE_URL'),
    apiKey: requireEnvironmentVariable('API_KEY'),
  };
}

export function getTestUser() {
  return {
    email: requireEnvironmentVariable('TEST_USER_EMAIL'),
    password: requireEnvironmentVariable('TEST_USER_PASSWORD'),
  };
}
