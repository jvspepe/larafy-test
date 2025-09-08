import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url(),
});

const envParse = envSchema.safeParse(import.meta.env);

if (!envParse.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.treeifyError(envParse.error),
  );
  throw new Error('Invalid environment variables');
}

export const env = envParse.data;
