import { useQuery } from '@tanstack/react-query';
import { getAllSpreadsheets } from '@/api/spreadsheets';
import { SpreadsheetCard } from '@/components/spreadsheet-card';

export function SpreadsheetDisplay() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['spreadsheets'],
    queryFn: getAllSpreadsheets,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading spreadsheets.</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((spreadsheet) => (
        <SpreadsheetCard
          key={spreadsheet.id}
          spreadsheet={spreadsheet}
        />
      ))}
    </div>
  );
}
