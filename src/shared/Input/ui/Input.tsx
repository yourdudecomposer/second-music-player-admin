import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?:string
  onChange?:ChangeEventHandler<HTMLInputElement>,
  value?:string,
}

export function Input({
  className = '',
  placeholder,
  onChange,
  value,
  required,
}:InputProps) {
  return (
    <input
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${cls.input} ${className}`}
    />
  );
}
