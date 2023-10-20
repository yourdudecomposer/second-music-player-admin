import { Input } from '@/shared/ui/Input';
import { ModalWrapper } from '@/shared/ui/ModalWrapper';
import React, { FormEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { FileInput } from '@/shared/ui/FileInput';
import { Checkbox } from '@/shared/ui/Checkbox';
import cls from './AddNewTrackModal.module.scss';
import { createTrack } from '../model/service/AddNewTrackService';

interface AddNewTrackModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: ()=>void
  isOpenModal:boolean
}

export function AddNewTrackModal({ setIsOpenModal, isOpenModal, refetch }: AddNewTrackModalProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append('isActive', String(isActive));
    setIsBtnDisabled(true);
    createTrack(form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsBtnDisabled(false);
        refetch();
        setIsOpenModal(false);
      });
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
          <Button disabled={isBtnDisabled} className={cls.button} type="submit">Add</Button>
        </form>
      </div>
    </ModalWrapper>
  );
}
