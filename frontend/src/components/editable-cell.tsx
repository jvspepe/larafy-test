import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import type { CellContext } from '@tanstack/react-table';

type EditableCellProps = { cellProps: CellContext<any, any> };
export function EditableCell({ cellProps }: EditableCellProps) {
  const initialValue = cellProps.getValue();

  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    // @ts-expect-error
    cellProps.table.options.meta?.updateData(
      cellProps.row.index,
      cellProps.column.id,
      value,
    );
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="rounded-none border-none bg-transparent dark:bg-transparent"
    />
  );
}
