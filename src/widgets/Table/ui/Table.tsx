import { Filter } from '@/features/Filter';
import { Pagination } from '@/features/Pagination';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,

} from '@tanstack/react-table';
import './table.scss';
import { DeleteModal } from '@/features/Delete/ui/DeleteModal';
import EditIcon from '@shared/assets/edit.svg?react';
import DeleteIcon from '@shared/assets/delete.svg?react';

import React, { useState } from 'react';
import { IconButton } from '@/shared/ui/IconButton';
import { EditModal } from '@/features/Edit';
import { Track } from '@/entities/Track/types/types';
import cls from './table.module.scss';
import { columns } from '../constants/constants';

export function Table({
  tracks,
}: {
      tracks: Track[] | undefined
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

  const tableBody = table.getRowModel().rows
    .map((row) => (
      <tr className={cls.row} key={row.id}>
        {row.getVisibleCells().map((cell) => {
          if (cell.column.id === 'createdAt') {
            const d = new Date(cell.row.original.createdAt);
            const yyyy = d.getFullYear();
            let mm: string | number = d.getMonth() + 1; // Months start at 0!
            let dd: string | number = d.getDate();

            if (dd < 10) dd = `0${dd}`;
            if (mm < 10) mm = `0${mm}`;

            const formattedToday = `${dd}/${mm}/${yyyy}`;
            return (
              <td key={cell.id}>
                {formattedToday}
              </td>
            );
          }
          if (cell.column.id === 'audio') {
            return (
              <td
                key={cell.id}
              >
                <audio controls src={`http://localhost:3000/${cell.row.original.audio}`} />

              </td>
            );
          }
          if (cell.column.id === 'cover') {
            return (
              <td key={cell.id}>
                <img src={`http://localhost:3000/${cell.row.original.cover}`} alt="" />

              </td>
            );
          }
          if (cell.column.id === 'actions') {
            return (
              <td

                key={cell.id}
              >
                <div className={cls.actions}>

                  <IconButton width="25" data={String(cell.row.original.id)} Icon={EditIcon} type="edit" />
                  <IconButton width="25" data={String(cell.row.original.id)} Icon={DeleteIcon} type="delete" />
                </div>

              </td>
            );
          }
          return (
            <td key={cell.id}>
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
