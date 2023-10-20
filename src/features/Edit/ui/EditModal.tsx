import React from 'react';
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ui/ModalWrapper';
import { Button } from '@/shared/ui/Button';
import cls from './EditModal.module.scss';

interface EditModalProps{
    setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
    isOpenEditModal:boolean
    currentTrackId:string
}
export function EditModal({ isOpenEditModal, setIsOpenEditModal, currentTrackId }:EditModalProps) {
  return (
    <ModalWrapper
      isOpenModal={isOpenEditModal}
      setIsOpenModal={setIsOpenEditModal}
    >
      <div className={cls.modal}>

        <h3>Edit Track</h3>
        <p>
          {`Are you shure you want delete track ${currentTrackId}?`}
        </p>
        <div className={cls.buttons}>
          <Button onClick={() => setIsOpenEditModal(false)}>Delete</Button>
          <Button onClick={() => setIsOpenEditModal(false)}>Cancel</Button>
        </div>
      </div>
    </ModalWrapper>

  );
}
