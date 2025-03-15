import { Env } from '@/libs/Env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: Env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
});
