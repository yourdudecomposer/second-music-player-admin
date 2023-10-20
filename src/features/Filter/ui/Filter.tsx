import { Column, Table } from '@tanstack/react-table';
import { Input } from '@/shared/ui/Input';
import cls from './Filter.module.scss';

export function Filter({
  column,
  table,
}: {
        column: Column<any, any>
        table: Table<any>
      }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  return typeof firstValue === 'number' ? (
    <div>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [
          e.target.value,
          old?.[1],
        ])}
        placeholder="Min"
        className={cls.input}
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [
          old?.[0],
          e.target.value,
        ])}
        placeholder="Max"
        className={cls.input}
      />
    </div>
  )
    : (
      <Input
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={column.id}
        className={cls.input}
      />
    );
}
