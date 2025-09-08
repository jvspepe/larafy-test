import { CreateSpreadsheet } from '@/components/create-spreadsheet';
import { SpreadsheetDisplay } from '../components/spreadsheet-display';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <CreateSpreadsheet />
      <SpreadsheetDisplay />
    </div>
  );
}
