import { Link } from 'react-router';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import type { Spreadsheet } from '@/types/spreadsheet';

type SpreadsheetCardProps = {
  spreadsheet: Spreadsheet;
};
export function SpreadsheetCard({ spreadsheet }: SpreadsheetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{spreadsheet.name}</CardTitle>
        <CardDescription className="flex flex-col">
          <span>Criado em {spreadsheet.createdAt.slice(0, 10)}</span>
          <span>Atualizado em {spreadsheet.updatedAt.slice(0, 10)}</span>
        </CardDescription>
        <CardAction>
          <Button
            asChild
            variant="secondary"
          >
            <Link to={`/spreadsheets/${spreadsheet.id}`}>
              <ArrowUpRightIcon aria-hidden />
              <span className="sr-only">Ver tabela</span>
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
