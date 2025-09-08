import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const auth = createAuthClient({
  baseURL: 'http://localhost:3000',
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
