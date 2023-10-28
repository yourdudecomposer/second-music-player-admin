import { useEffect, useMemo, useState } from 'react';
// import './index.css';

import { Table } from '@/widgets/Table';
import { AddNewTrackButton, AddNewTrackModal } from '@/features/AddNewTrack';
import { Spinner } from '@/shared/ui/Spinner';
import { useGetAllTracksQuery } from '@/entities/Track';
import { useNavigate } from 'react-router-dom';
import cls from './TablePage.module.scss';

export function TablePage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    data, error, isLoading, refetch,
  } = useGetAllTracksQuery('');

  const sortedData = useMemo(() => data
    ?.slice(0)
    .sort(
      (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)),
    ), [data]);

  useEffect(() => {
    if (error) {
      if ('status' in error && error.status === 401 && localStorage.getItem('token')) {
        localStorage.clear();
        navigate('/');
        navigate(0);
      }
    }
  }, [error]);

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
        tracks={sortedData}
      />
      <AddNewTrackButton onClick={() => setIsOpenModal(true)} className={cls.addButton} />
      <AddNewTrackModal refetch={refetch} setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />

    </>

  );
}
