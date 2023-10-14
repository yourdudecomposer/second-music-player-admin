import { useMemo, useState } from 'react';
// import './index.css';

import {
  ColumnDef,
} from '@tanstack/react-table';
import { Table } from '@/widgets/Table';
import { AddNewTrackButton, AddNewTrackModal } from '@/features/AddNewTrack';
import cls from './TablePage.module.scss';
import { tracks } from './mockData';

export type Track = {
    id:number,
    title: string;
    description: string;
    audio: string;
    cover: string;
    isActive: boolean;
  }

export function TablePage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const columns = useMemo<ColumnDef<Track>[]>(
    () => {
      const arr = [
        {
          accessorKey: 'title',
          header: 'title',
        },
        {
          accessorKey: 'description',
          header: 'description',
        },
      ];
      const nonIncludedFields = ['title', 'description', 'id'];
      return arr.concat(Object.keys(tracks[0])
        .filter((key) => !nonIncludedFields.includes(key))
        .map((key) => ({
          accessorKey: key,
          header: key,

        })))
        .concat([
          {
            accessorKey: 'actions',
            header: 'actions',
          },
        ]);
    },
    [],
  );

  return (
    <>
      <Table
        {...{
          tracks,
          columns,
        }}
      />
      <AddNewTrackButton onClick={() => setIsOpenModal(true)} className={cls.addButton} />
      <AddNewTrackModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
    </>

  );
}
