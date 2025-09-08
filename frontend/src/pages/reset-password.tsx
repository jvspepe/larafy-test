import { useNavigate, useSearchParams } from 'react-router';
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

const signUpSchema = z
  .object({
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas devem ser iguais',
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const defaultValues: SignUpSchema = {
  password: '',
  passwordConfirmation: '',
};

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const form = useForm<SignUpSchema>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ password }) => {
    if (!token) return;
    toast.promise(auth.resetPassword({ newPassword: password, token }), {
      loading: 'Atualizando senha...',
      success: () => {
        form.reset();
        return {
          type: 'success',
          richColors: true,
          message: 'Senha atualizada! Você será redirecionado ao login.',
          onAutoClose: () => {
            navigate(routes.signIn);
          },
          onDismiss: () => {
            navigate(routes.signIn);
          },
        };
      },
      error: () => {
        return {
          type: 'error',
          richColors: true,
          message: 'Erro ao atualizar senha. Tente novamente.',
        };
      },
    });
    //
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
            Confirmar
          </Button>
        </form>
      </Form>
    </div>
  );
}
