import React from 'react';
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ui/ModalWrapper';
import { Button } from '@/shared/ui/Button';
import cls from './DeleteModal.module.scss';

interface DeleteModalProps{
    setIsOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    isOpenDeleteModal:boolean
    currentTrackId:string
}
export function DeleteModal({ isOpenDeleteModal, setIsOpenDeleteModal, currentTrackId }:DeleteModalProps) {
  return (
    <ModalWrapper
      isOpenModal={isOpenDeleteModal}
      setIsOpenModal={setIsOpenDeleteModal}
    >
      <div className={cls.modal}>

        <h3>Delete Track</h3>
        <p>
          {`Are you shure you whant delete track ${currentTrackId}?`}
        </p>
        <div className={cls.buttons}>
          <Button onClick={() => setIsOpenDeleteModal(false)}>Delete</Button>
          <Button onClick={() => setIsOpenDeleteModal(false)}>Cancel</Button>
        </div>
      </div>
    </ModalWrapper>

  );
}
