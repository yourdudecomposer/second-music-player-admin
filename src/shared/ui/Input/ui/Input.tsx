import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?:string
}

export function Input({
  className = '',
  placeholder,
  onChange,
  value,
  required,
  name,
}:InputProps) {
  return (
    <input
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${cls.input} ${className}`}
    />
  );
}
