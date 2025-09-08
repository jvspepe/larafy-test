import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  ChevronsUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from 'lucide-react';
import type { User } from '@/lib/auth';
import { getAllUsers } from '@/api/users';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { UsersCreateDialog } from '@/components/users-create-dialog';

const roleLabels = {
  super_admin: 'Super Administrador',
  admin: 'Administrador',
  user: 'Usuário',
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'emailVerified',
    header: 'Verificado',
    cell: (props) => (props.getValue() ? 'Sim' : 'Não'),
  },
  {
    accessorKey: 'role',
    header: 'Função',
    cell: (props) => roleLabels[props.getValue() as keyof typeof roleLabels],
  },
];

export function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    initialData: [],
  });

  const [users, setUsers] = useState<User[]>(data);

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: false,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) =>
        setUsers((previous) =>
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Buscar em usuários..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />
          <UsersCreateDialog />
        </div>
        <div className="text-muted-foreground ml-auto text-sm">
          {table.getFilteredRowModel().rows.length} resultados
        </div>
      </div>
      {isLoading && <div>Carregando informações...</div>}
      {isError && <div>Erro ao buscar usuários.</div>}
      {!data || (data.length === 0 && <div>Nenhum usuário encontrado.</div>)}
      {data && data.length > 0 && (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      onClick={() =>
                        canSort ? header.column.toggleSorting() : undefined
                      }
                      style={{
                        width: header.column.getSize(),
                      }}
                      className="border"
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort ? (
                          <span>
                            {sorted === 'asc' ? (
                              <ChevronUpIcon className="size-4" />
                            ) : sorted === 'desc' ? (
                              <ChevronDownIcon className="size-4" />
                            ) : (
                              <ChevronsUpDownIcon className="size-4 opacity-60" />
                            )}
                          </span>
                        ) : null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="border"
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
