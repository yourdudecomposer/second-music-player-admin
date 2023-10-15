import { ReactNode, ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children:ReactNode
    onClick?:()=>void
    className?:string
    isLoading?:boolean
}

export function Button({
  isLoading = false,
  children,
  onClick = () => {},
  type = 'button',
  className,
}:ButtonProps) {
  return (
    <button
      disabled={isLoading}
      /* eslint-disable react/button-has-type */
      type={type}
      /* eslint-enable react/button-has-type */
      className={`${cls.button} ${className}`}
      onClick={onClick}
    >
      {children}

    </button>
  );
}
