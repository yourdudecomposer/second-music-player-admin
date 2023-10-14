import React from 'react';
import cls from './IconButton.module.scss';

interface IconButtonProps {
    Icon:React.FC<React.SVGProps<SVGSVGElement>>
    data?:string
    width?:string
    height?:string
    onClick?:()=>void
    type:'edit'| 'delete'
}

export function IconButton({
  Icon,
  width = '30',
  height = '30',
  data,
  type,
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={cls.button}
      type="button"
      onClick={onClick}
      data-type={type}
      data-data={data}
    >
      <Icon
        width={width}
        height={height}
      />
    </button>
  );
}
