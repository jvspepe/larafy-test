import { toast } from 'sonner';
import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { createUser } from '@/api/users';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/main';

const createUserSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  email: z.email({ message: 'E-mail inválido' }),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

const defaultValues: CreateUserFormValues = {
  name: '',
  email: '',
};

export function UsersCreateDialog() {
  const { mutateAsync } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const form = useForm<CreateUserFormValues>({
    defaultValues,
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<CreateUserFormValues> = async ({
    email,
    name,
  }) => {
    toast.promise(mutateAsync({ email, name }), {
      loading: 'Criando usuário...',
      success: (data) => {
        form.reset();
        return {
          type: 'success',
          richColors: true,
          message: data.message,
        };
      },
      error: (err) => `Erro ao criar usuário: ${err.message}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
        >
          <PlusIcon aria-hidden />
          <span>Criar novo usuário</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar um novo usuário.
          </DialogDescription>
        </DialogHeader>
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
                      placeholder="Nome de usuário"
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
                      placeholder="E-mail do usuário"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 justify-self-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Confirmar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
