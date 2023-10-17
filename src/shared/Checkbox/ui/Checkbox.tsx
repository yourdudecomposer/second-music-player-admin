import { InputHTMLAttributes } from 'react';
import './Checkbox.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    className?:string
    label?:string
}

export function Checkbox({
  className,
  label,
  required,
  onChange,
}: CheckboxProps) {
  return (
    <div className={`checkbox ${className}`}>
      <input
        onChange={onChange}
        required={required}
        className="custom-checkbox"
        type="checkbox"
        id="check"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="check">{label}</label>
    </div>

  );
}
