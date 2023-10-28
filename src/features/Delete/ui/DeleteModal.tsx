import React from 'react';
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ui/ModalWrapper';
import { Button } from '@/shared/ui/Button';
import { useDeleteTrackMutation, useGetAllTracksQuery } from '@/entities/Track';
import cls from './DeleteModal.module.scss';

interface DeleteModalProps{
    setIsOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    isOpenDeleteModal:boolean
    currentTrackId:string
}
export function DeleteModal({ isOpenDeleteModal, setIsOpenDeleteModal, currentTrackId }:DeleteModalProps) {
  const [deleteTrack, { isLoading: isDeletingProcess }] = useDeleteTrackMutation();

  const {
    isLoading: isTableLoading, refetch,
  } = useGetAllTracksQuery('');

  const HandleClick = () => {
    deleteTrack(currentTrackId)
      .then(refetch)
      .then(() => {
        setIsOpenDeleteModal(false);
      });
  };
  return (
    <ModalWrapper
      isOpenModal={isOpenDeleteModal}
      setIsOpenModal={setIsOpenDeleteModal}
    >
      <div className={cls.modal}>

        <h3>Delete Track</h3>
        <p>
          {`Are you shure you want delete track ${currentTrackId}?`}
        </p>
        <div className={cls.buttons}>
          <Button disabled={isDeletingProcess || isTableLoading} className={cls.button} onClick={HandleClick}>Delete</Button>
          <Button onClick={() => setIsOpenDeleteModal(false)}>Cancel</Button>
        </div>
      </div>
    </ModalWrapper>

  );
}
