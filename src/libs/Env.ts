import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const Env = createEnv({
  server: {
    // ARCJET
    ARCJET_KEY: z.string().startsWith('ajkey_').optional(),
    // AUTH
    CLERK_SECRET_KEY: z.string().min(1),
    // LOGTAIL
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
    // DATABASE
    DATABASE_URL: z.string(),
    SUPABASE_PASSWORD: z.string(),
    // AI
    OPENAI_API_KEY: z.string(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  },
  shared: {
    NODE_ENV: z.enum(['test', 'development', 'production']).optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    // ARCJET
    ARCJET_KEY: process.env.ARCJET_KEY,
    // AUTH
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    // LOGTAIL
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    // CLIENT
    NODE_ENV: process.env.NODE_ENV,
    // DATABASE
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_PASSWORD: process.env.SUPABASE_PASSWORD,
    // AI
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
});
