import { Filter } from '@/features/Filter';
import { Pagination } from '@/features/Pagination';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,

} from '@tanstack/react-table';
import './table.scss';
import { DeleteModal } from '@/features/Delete/ui/DeleteModal';
import EditIcon from '@shared/assets/edit.svg?react';
import DeleteIcon from '@shared/assets/delete.svg?react';

import React, { useState } from 'react';
import { IconButton } from '@/shared/IconButton';
import { EditModal } from '@/features/Edit';
import { Track } from '@/pages/TablePage/model/types/TrackSchema';
import cls from './table.module.scss';

export function Table({
  tracks,
  columns,
}: {
      tracks: Track[] | undefined
      columns: ColumnDef<Track>[]
    }) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] = useState<string>('');

  const table = useReactTable({
    data: tracks || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  function openDelModal(e: React.MouseEvent<HTMLTableSectionElement>) {
    let type;
    if (e.target instanceof HTMLButtonElement && e.target.dataset.data) {
      type = e.target.dataset.type;
      setCurrentTrackId(e.target.dataset.data);
    } else if (e.target instanceof SVGElement && e.target.parentNode) {
      type = (e.target.parentNode as SVGElement).closest('button')?.dataset.type;
      setCurrentTrackId((e.target.parentNode as SVGElement).closest('button')?.dataset.data as string);
    }
    if (type === 'delete') {
      setIsOpenDeleteModal(true);
    }
    if (type === 'edit') {
      setIsOpenEditModal(true);
    }
  }
  const tableHeaders = table.getHeaderGroups()[0].headers.map((header) => (
    <th key={header.id} colSpan={header.colSpan}>
      {header.isPlaceholder ? null : (

        <div>
          {header.column.columnDef.header !== 'title' ? flexRender(
            header.column.columnDef.header,
            header.getContext(),
          ) : null}
          { header.column.columnDef.header === 'title' ? (
            <div>
              <Filter column={header.column} table={table} />
            </div>
          ) : null}
        </div>
      )}
    </th>
  ));

  const tableBody = table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        if (cell.column.id === 'actions') {
          return (
            <td
              className={cls.actions}
              key={cell.id}
            >
              <IconButton width="25" data={String(cell.row.original.id)} Icon={EditIcon} type="edit" />
              <IconButton width="25" data={String(cell.row.original.id)} Icon={DeleteIcon} type="delete" />

            </td>
          );
        }
        return (
          <td style={{ textAlign: 'center' }} key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext(),
            )}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          <tr>
            {tableHeaders}
          </tr>

        </thead>
        {/* eslint-disable-next-line
        jsx-a11y/no-noninteractive-element-interactions,
         jsx-a11y/click-events-have-key-events */}
        <tbody onClick={(e) => openDelModal(e)}>
          {tableBody}
        </tbody>
      </table>
      <Pagination table={table} />

      <DeleteModal
        currentTrackId={currentTrackId}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
      <EditModal
        currentTrackId={currentTrackId}
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
      />
    </div>
  );
}
