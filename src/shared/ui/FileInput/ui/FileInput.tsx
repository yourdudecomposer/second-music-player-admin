import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect, useRef, useState,
} from 'react';
import cls from './FileInput.module.scss';

type fileType = '.mp3' | '.png,.jpg'
interface FileInputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?:string
    label:string
    accept:fileType
}

export function FileInput({
  className, label, required, accept, name,
}: FileInputProps) {
  const refBtn = useRef<HTMLButtonElement>(null);
  const refInp = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(cls.error);
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

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setError('');
    } else {
      setError(cls.error);
    }
  };

  return (
    <div className={`${className} ${cls.wrapper} ${error}`}>
      <button className={cls.button} ref={refBtn} type="button">{label}</button>
      <input
        name={name}
        onChange={handleChange}
        accept={accept}
        required={required}
        className={`${cls.input} ${error}`}
        ref={refInp}
        type="file"
      />
    </div>
  );
}
