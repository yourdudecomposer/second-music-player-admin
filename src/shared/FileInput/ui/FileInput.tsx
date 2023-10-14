import {
  InputHTMLAttributes,
  useEffect, useRef,
} from 'react';
import cls from './FileInput.module.scss';

type fileType = '.mp3' | '.png,.jpg'
interface FileInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string
    label:string
    accept:fileType
}

export function FileInput({
  className, label, required, accept,
}: FileInputProps) {
  const refBtn = useRef<HTMLButtonElement>(null);
  const refInp = useRef<HTMLInputElement>(null);
  const clickHandler = () => {
    refInp.current?.click();
  };
  useEffect(() => {
    const ref = refBtn.current;
    ref?.addEventListener('click', clickHandler);
    return () => {
      ref?.removeEventListener('click', clickHandler);
    };
  }, []);
  return (
    <div className={`${className} ${cls.wrapper}`}>
      <button className={cls.button} ref={refBtn} type="button">{label}</button>
      <input accept={accept} required={required} className={cls.input} ref={refInp} type="file" />

    </div>
  );
}
