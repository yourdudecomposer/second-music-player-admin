import { Dialog } from '@headlessui/react';
import React, { ReactNode } from 'react';
import cls from './ModalWrapper.module.scss';

interface ModalWrapperProps{
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenModal:boolean
  children:ReactNode
}
export function ModalWrapper({
  isOpenModal,
  setIsOpenModal,
  children,
}:ModalWrapperProps) {
  return (

    <Dialog
      className={cls.overlay}
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
    >

      <Dialog.Panel className={cls.panel}>
        {children}
      </Dialog.Panel>
    </Dialog>

  );
}
