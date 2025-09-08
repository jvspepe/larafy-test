import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { deleteSpreadsheet } from '@/api/spreadsheets';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type SpreadsheetDeleteDialogProps = {
  spreadsheetId: string;
  spreadsheetName: string;
};
export function SpreadsheetDeleteDialog({
  spreadsheetId,
  spreadsheetName,
}: SpreadsheetDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['spreadsheets', spreadsheetId],
    mutationFn: async (id: string) => {
      return await deleteSpreadsheet(id);
    },
  });

  const handleDeleteSpreadsheet = async () => {
    toast.promise(mutateAsync(spreadsheetId), {
      loading: 'Excluindo tabela...',
      success: (data) => {
        setOpen(false);
        navigate('/spreadsheets');
        return {
          type: 'success',
          richColors: true,
          message: data,
        };
      },
      error: 'Erro ao excluir tabela. Tente novamente.',
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="ghost"
        >
          <TrashIcon aria-hidden />
          <span className="sr-only">Excluir tabela</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir tabela</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a tabela{' '}
            <span className="text-primary font-bold">{spreadsheetName}</span>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 justify-self-end">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={isPending}
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteSpreadsheet}
            type="button"
            disabled={isPending}
            variant="destructive"
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
