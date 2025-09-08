import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getSpreadsheet } from '@/api/spreadsheets';
import { Spreadsheet } from '@/components/spreadsheet';
import { SpreadsheetDeleteDialog } from '../components/spreadsheet-delete-dialog';

export function SpreadsheetDetails() {
  const { tableId } = useParams() as { tableId: string };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['spreadsheet', tableId],
    queryFn: () => getSpreadsheet(tableId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading spreadsheet.</div>;
  }

  return (
    <main className="flex flex-col gap-4">
      <header className="flex items-center gap-2">
        <h1 className="text-2xl">{data.name}</h1>
        <SpreadsheetDeleteDialog
          spreadsheetId={tableId}
          spreadsheetName={data.name}
        />
      </header>
      <Spreadsheet
        initialData={data.data}
        spreadsheetId={tableId}
      />
    </main>
  );
}
