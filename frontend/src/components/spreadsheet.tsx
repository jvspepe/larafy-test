import { useMemo, useState, type ChangeEvent } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table';
import Papa from 'papaparse';
import {
  ChevronUp,
  ChevronDown,
  Minus,
  ChevronsLeft,
  ChevronsRight,
  ChevronDownIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UploadIcon,
} from 'lucide-react';
import { updateSpreadsheet } from '@/api/spreadsheets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { EditableCell } from '@/components/editable-cell';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { toast } from 'sonner';

type SpreadsheetProps = {
  spreadsheetId: string;
  initialData: any[];
};
export function Spreadsheet({ initialData, spreadsheetId }: SpreadsheetProps) {
  // Data & state
  const [data, setData] = useState<any[]>(initialData || []);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  // CSV import handler
  const handleFileImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data as any[];
        setData(parsed);
        setPagination((p) => ({ ...p, pageIndex: 0 }));
      },
    });
  };

  console.log(data);

  const handleSaveSpreadsheet = async () => {
    toast.promise(
      updateSpreadsheet(spreadsheetId, { data: JSON.stringify(data) }),
      {
        loading: 'Salvando tabela...',
        success: {
          type: 'success',
          richColors: true,
          message: 'Tabela salva com sucesso!',
        },
        error: {
          type: 'error',
          richColors: true,
          message: 'Erro ao salvar tabela. Tente novamente.',
        },
      },
    );
  };

  const columns = useMemo<ColumnDef<any, any>[]>(() => {
    if (!data || data.length === 0) return [];

    const keys = Object.keys(data[0]);

    return keys.map((key) => ({
      accessorKey: key,
      header: key,
      cell: (props) => {
        return <EditableCell cellProps={props} />;
      },
    }));
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) =>
        setData((previous) =>
          previous.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...previous[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        ),
    },
  });

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `spreadsheet_${spreadsheetId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Pesquisar na tabela..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-fit"
          />
          {data.length > 0 && (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="grow"
                  >
                    Colunas
                    <ChevronDownIcon aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {table.getAllColumns().map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(v) => col.toggleVisibility(!!v)}
                    >
                      {col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(v) => table.setPageSize(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[5, 10, 20, 50].map((p) => (
                      <SelectItem
                        key={p}
                        value={String(p)}
                      >
                        Mostrar {p} linhas
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button
            asChild
            variant="outline"
          >
            <Label>
              <Input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFileImport(e)}
              />
              <UploadIcon aria-hidden />
              Importar .csv
            </Label>
          </Button>
          <Button
            onClick={handleDownloadCSV}
            type="button"
            variant="outline"
          >
            <DownloadIcon aria-hidden />
            Exportar .csv
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Salvar alterações</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Salvar alterações</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja salvar suas alterações?
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2 justify-self-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleSaveSpreadsheet}
                  type="button"
                >
                  Confirmar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {data.length > 0 && (
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </Button>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm">
              Pág. {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </Button>
          </div>
        )}
      </div>
      <span className="text-muted-foreground text-sm">
        Total de itens: {table.getRowCount()}
      </span>

      {data.length > 0 && (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? 'pointer'
                        : 'default',
                    }}
                    className="border"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: (
                        <ChevronUp
                          size={14}
                          className="ml-2 inline"
                        />
                      ),
                      desc: (
                        <ChevronDown
                          size={14}
                          className="ml-2 inline"
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? (
                      <Minus
                        size={12}
                        className="ml-2 inline"
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border p-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
