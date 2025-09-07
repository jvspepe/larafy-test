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

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const defaultValues: SignUpSchema = {
  email: '',
  password: '',
};

export function SignIn() {
  const navigate = useNavigate();

  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ email, password }) => {
    await auth.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (ctx) => {
          console.error(ctx);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Seu e-mail   "
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
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? 'Carregando...' : 'Confirmar'}
          </Button>
          <div className="self-center">
            <span className="text-sm">Não possui uma conta? </span>
            <Button
              asChild
              variant="link"
              className="p-0"
            >
              <Link to="/sign-up">Criar</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
