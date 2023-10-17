import { useMemo, useState } from 'react';
// import './index.css';

import {
  ColumnDef,
} from '@tanstack/react-table';
import { Table } from '@/widgets/Table';
import { AddNewTrackButton, AddNewTrackModal } from '@/features/AddNewTrack';
import cls from './TablePage.module.scss';
import { tracks } from './mockData';
import { useGetAllTracksQuery } from '../model/services/fetchTracks';
import { Track } from '../model/types/TrackSchema';

export function TablePage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, error, isLoading } = useGetAllTracksQuery('');
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

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>some error</p>;
  }

  return (
    <>

      <Table
        tracks={data}
        columns={columns}

      />
      <AddNewTrackButton onClick={() => setIsOpenModal(true)} className={cls.addButton} />
      <AddNewTrackModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
    </>

  );
}
