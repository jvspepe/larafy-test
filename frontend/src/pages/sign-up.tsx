import { Link, useNavigate } from 'react-router';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const defaultValues: SignUpSchema = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export function SignUp() {
  const navigate = useNavigate();

  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({
    name,
    email,
    password,
  }) => {
    await auth.signUp.email(
      {
        name,
        email,
        password,
        role: 'user',
      },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
          form.setError('root', { message: ctx.error.message });
        },
      },
    );
  };

  return (
    <div className="flex h-svh items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-w-80 flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Seu nome"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Seu e-mail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Sua senha"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirmar sua senha"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? 'Carregando...' : 'Confirmar'}
          </Button>
          <div className="self-center">
            <span className="text-sm">Já possui uma conta? </span>
            <Button
              asChild
              variant="link"
              className="p-0"
            >
              <Link to={routes.signIn}>Conectar</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
