import { ModalWrapper } from '@/shared/ui/ModalWrapper';
import React, { FormEvent, useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
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
  const [login, { isLoading, isError }] = useAdminMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errorTxt, setErrorTxt] = useState('');
  const [formState, setFormState] = useState<LoginRequest>({
    password: '',
  });
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await login(formState).unwrap();
      localStorage.setItem('token', token.token);
      dispatch(setIsLogged(true));
      navigate('/table');
    } catch (err:unknown) {
      if (err.status === 'FETCH_ERROR') {
        setErrorTxt('something go wrong');
      } else {
        setErrorTxt('try again');
      }
      console.log(err);
    }
  };
  return (
    <ModalWrapper isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>

      <form className={cls.modal} onSubmit={handleSubmit}>

        <Input
          name="password"
          onChange={handleChange}
          required
          placeholder="parol"
          className={cls.input}
        />
        {isError && <p className={cls.error}>{errorTxt}</p> }
        <Button
          disabled={isLoading}
          className={cls.button}
          type="submit"
        >
          Login
        </Button>

      </form>
    </ModalWrapper>

  );
}
