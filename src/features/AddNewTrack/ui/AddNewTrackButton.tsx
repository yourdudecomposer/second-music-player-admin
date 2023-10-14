import { ButtonHTMLAttributes } from 'react';
import cls from './AddNewTrackButton.module.scss';

interface AddNewTrackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?:string
}
export function AddNewTrackButton({ className = '', onClick }:AddNewTrackButtonProps) {
  return (
    <button onClick={onClick} type="button" className={`${cls.button} ${className}`}>Add</button>
  );
}
