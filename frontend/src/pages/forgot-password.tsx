import { Link } from 'react-router';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
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

const signUpSchema = z.object({
  email: z.email(),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const defaultValues: SignUpSchema = {
  email: '',
};

export function ForgotPassword() {
  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ email }) => {
    toast.promise(
      auth.requestPasswordReset({
        email,
        redirectTo: `http://localhost:5173/reset-password`,
      }),
      {
        loading: 'Enviando e-mail...',
        success: () => {
          form.reset();
          return {
            type: 'success',
            richColors: true,
            message:
              'E-mail enviado! Feche esta aba e verifique sua caixa de entrada.',
          };
        },
        error: () => {
          return {
            type: 'error',
            richColors: true,
            message: 'Erro ao enviar e-mail. Tente novamente.',
          };
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
                <FormLabel>E-mail</FormLabel>
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
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? 'Carregando...' : 'Confirmar'}
          </Button>
          <div className="self-center">
            <Button
              asChild
              variant="link"
              className="p-0"
            >
              <Link to={routes.home}>Voltar ao início</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
