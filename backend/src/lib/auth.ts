import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../config/db";
import { users } from "../db/schema/users";
import { accounts } from "../db/schema/accounts";
import { sessions } from "../db/schema/sessions";
import { verifications } from "../db/schema/verifications";
import { resend } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users,
      accounts,
      sessions,
      verifications,
    },
    usePlural: true,
  }),
  trustedOrigins: ["http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Redefinição de Senha",
        html: `<p>Olá, ${user.name}, para redefinir sua senha, siga o link abaixo:</p><br/>
               <a href="${url}?token=${token}">Redefinir Senha</a>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Verificação de Email",
        html: `<p>Olá, ${user.name}, por favor, verifique seu e-mail clicando no link abaixo:</p><br/>
               <a href="${url}?token=${token}">Verificar Email</a>`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
});

// Use the auth session user type instead of schema inference
export type User = typeof auth.$Infer.Session.user;
