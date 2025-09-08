import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Papa from 'papaparse';
import { FileUpIcon } from 'lucide-react';
import { SpreadsheetSchema } from '@/types/spreadsheet';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { createSpreadsheet } from '@/api/spreadsheets';
import { useNavigate } from 'react-router';

const createSpreadsheetSchema = SpreadsheetSchema.pick({
  name: true,
}).extend({
  data: z.instanceof(FileList).nullable(),
});

type CreateSpreadsheetForm = z.infer<typeof createSpreadsheetSchema>;

const defaultValues: CreateSpreadsheetForm = {
  name: '',
  data: null,
};

export function CreateSpreadsheet() {
  const { mutateAsync } = useMutation({
    mutationKey: ['spreadsheets'],
    mutationFn: async (spreadsheetData: { name: string; data: string }) =>
      await createSpreadsheet(spreadsheetData.name, spreadsheetData.data),
  });

  const navigate = useNavigate();

  const form = useForm<CreateSpreadsheetForm>({
    defaultValues,
    resolver: zodResolver(createSpreadsheetSchema),
  });

  const fileField = form.register('data');

  const onSubmit: SubmitHandler<CreateSpreadsheetForm> = ({ name, data }) => {
    if (!data || data.length === 0) {
      form.setError('data', { message: 'Por favor, envie um arquivo .csv' });
      return;
    }

    const csvData = data[0];

    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async (results) => {
        const parsed = results.data as any[];
        const data = await mutateAsync({ name, data: JSON.stringify(parsed) });
        navigate(`/spreadsheets/${data.id}`);
      },
      error: (error) => {
        form.setError('data', { message: 'Erro ao ler o arquivo .csv' });
        console.error('Error parsing CSV:', error);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-fit"
        >
          Criar nova tabela
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Criar nova tabela</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova tabela
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da tabela</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Minha tabela"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem>
              <Button asChild>
                <FormLabel>
                  <FileUpIcon aria-hidden />
                  Importar dados de um arquivo .csv
                </FormLabel>
              </Button>
              <FormControl>
                <Input
                  {...fileField}
                  type="file"
                  accept=".csv"
                  className="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? 'Carregando...' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
