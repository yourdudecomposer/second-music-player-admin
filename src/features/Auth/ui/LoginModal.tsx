import { ModalWrapper } from '@/shared/ModalWrapper';
import React, { useEffect, useState } from 'react';
import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cls from './LoginModal.module.scss';
import { LoginRequest, useAdminMutation } from '../model/service/AuthService';
import { setIsLogged } from '../model/slice/AuthSlice';

interface LoginModalProps {
    setIsOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
    isOpenModal?:boolean
}

export function LoginModal({ setIsOpenModal = () => {}, isOpenModal = true }: LoginModalProps) {
  const [login, { isLoading }] = useAdminMutation();
  const dispatch = useDispatch();
  console.log(isLoading);

  const navigate = useNavigate();
  const [formState, setFormState] = useState<LoginRequest>({
    password: '',
  });
  useEffect(() => { console.log(formState); }, [formState]);
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  // function handleSubmit(e:FormEvent<HTMLFormElement>) {
  //   console.log(123);
  //   e.preventDefault();
  //   console.log(((e.target as HTMLFormElement)[0] as HTMLInputElement).value);
  // }

  const handleClick = async () => {
    try {
      const token = await login(formState).unwrap();
      localStorage.setItem('token', token.token);
      dispatch(setIsLogged(true));
      navigate('/table');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ModalWrapper isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>

      <div className={cls.modal}>

        <Input
          name="password"
          onChange={handleChange}
          required
          placeholder="parol"
          className={cls.input}
        />
        <Button
          isLoading={isLoading}
          onClick={handleClick}
          className={cls.button}
          type="submit"
        >
          Add

        </Button>

      </div>
    </ModalWrapper>

  );
}
