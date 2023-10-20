import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Spinner } from '@/shared/ui/Spinner';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children:ReactNode
    onClick?:()=>void
    className?:string
    disabled?:boolean
}

export function Button({
  disabled = false,
  children,
  onClick = () => {},
  type = 'button',
  className,
}:ButtonProps) {
  return (
    <button
      disabled={disabled}
      /* eslint-disable react/button-has-type */
      type={type}
      /* eslint-enable react/button-has-type */
      className={`${cls.button} ${className} ${disabled ? cls.disabled : ''}`}
      onClick={onClick}
    >
      {disabled ? <Spinner /> : children}

    </button>
  );
}
