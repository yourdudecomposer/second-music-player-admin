import { useMemo, useState } from 'react';
// import './index.css';

import {
  ColumnDef,
} from '@tanstack/react-table';
import { Table } from '@/widgets/Table';
import { AddNewTrackButton, AddNewTrackModal } from '@/features/AddNewTrack';
import { Spinner } from '@/shared/ui/Spinner';
import cls from './TablePage.module.scss';
import { tracks } from './mockData';
import { useGetAllTracksQuery } from '../model/services/fetchTracks';
import { Track } from '../model/types/TrackSchema';

export function TablePage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const {
    data, error, isLoading, refetch,
  } = useGetAllTracksQuery('');

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
    return (
      <div
        className={cls.loading}
      >
        <Spinner color="red" bigger />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div>
        <p>some error</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <>

      <Table
        tracks={data}
        columns={columns}

      />
      <AddNewTrackButton onClick={() => setIsOpenModal(true)} className={cls.addButton} />
      <AddNewTrackModal refetch={refetch} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
    </>

  );
}
