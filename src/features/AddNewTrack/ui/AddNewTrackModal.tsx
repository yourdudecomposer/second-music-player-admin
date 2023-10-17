import { Input } from '@/shared/Input';
import { ModalWrapper } from '@/shared/ModalWrapper';
import React, { FormEvent, useState } from 'react';
import { Button } from '@/shared/Button';
import { FileInput } from '@/shared/FileInput';
import { Checkbox } from '@/shared/Checkbox';
import cls from './AddNewTrackModal.module.scss';

interface AddNewTrackModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenModal:boolean
}

export function AddNewTrackModal({ setIsOpenModal, isOpenModal }: AddNewTrackModalProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const submitter = document.querySelector('button[value=save]');
    const form = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(form), ...{ isActive } };
    console.log(data);
  }
  return (
    <ModalWrapper
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
    >
      <div className={cls.modal}>

        <form className={cls.form} onSubmit={handleSubmit} action="">
          <h3>Add Track</h3>
          <Input name="title" required placeholder="title" className={cls.input} />

          <Input name="description" placeholder="description" className={cls.input} />
          <FileInput name="audio" accept=".mp3" required className={cls.fileInput} label="Add Audio" />
          <FileInput name="cover" accept=".png,.jpg" required className={cls.fileInput} label="Add Cover" />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <Checkbox onChange={() => setIsActive(!isActive)} label="isActive" />
          <Button className={cls.button} type="submit">Add</Button>
        </form>
      </div>
    </ModalWrapper>
  );
}
