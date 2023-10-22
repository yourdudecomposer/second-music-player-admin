import { Input } from '@/shared/ui/Input';
import { ModalWrapper } from '@/shared/ui/ModalWrapper';
import React, { FormEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { FileInput } from '@/shared/ui/FileInput';
import { Checkbox } from '@/shared/ui/Checkbox';
import { createTrack, editTrack, useGetAllTracksQuery } from '@/entities/Track';
import cls from './EditModal.module.scss';

interface EditModalProps {
  setIsOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
    isOpenEditModal:boolean
    currentTrackId:string
}

export function EditModal({ setIsOpenEditModal, isOpenEditModal, currentTrackId }: EditModalProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

  const {
    refetch,
  } = useGetAllTracksQuery('');
  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append('isActive', String(isActive));
    setIsBtnDisabled(true);

    editTrack(currentTrackId, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsBtnDisabled(false);
        refetch();
        setIsOpenEditModal(false);
      });
  }

  return (
    <ModalWrapper
      isOpenModal={isOpenEditModal}
      setIsOpenModal={setIsOpenEditModal}
    >
      <div className={cls.modal}>
        <form className={cls.form} onSubmit={handleSubmit} action="">
          <h3>Edit Track</h3>
          <Input name="description" placeholder="description" className={cls.input} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <Checkbox onChange={() => setIsActive(!isActive)} label="isActive" />
          <Button disabled={isBtnDisabled} className={cls.button} type="submit">Add</Button>
        </form>
      </div>
    </ModalWrapper>
  );
}
