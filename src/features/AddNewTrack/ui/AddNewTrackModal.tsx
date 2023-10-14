import { Input } from '@/shared/Input';
import { ModalWrapper } from '@/shared/ModalWrapper';
import React, { FormEvent } from 'react';
import { Button } from '@/shared/Button';
import { FileInput } from '@/shared/FileInput';
import cls from './AddNewTrackModal.module.scss';

interface AddNewTrackModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenModal:boolean
}

export function AddNewTrackModal({ setIsOpenModal, isOpenModal }: AddNewTrackModalProps) {
  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(((e.target as HTMLFormElement)[0] as HTMLInputElement).value);
  }
  return (
    <ModalWrapper
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
    >
      <div className={cls.modal}>
        <h3>Add Track</h3>
        <form className={cls.form} onSubmit={handleSubmit} action="">

          <Input required placeholder="title" className={cls.input} />
          <Input placeholder="description" className={cls.input} />
          <FileInput accept=".mp3" required className={cls.fileInput} label="Add Audio" />
          <FileInput accept=".png,.jpg" required className={cls.fileInput} label="Add Cover" />
          <Button className={cls.button} type="submit">add</Button>
        </form>
      </div>
    </ModalWrapper>
  );
}
