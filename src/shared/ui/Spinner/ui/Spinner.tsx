import './Spinner.css';

type Colors = 'red'|'green'|'blue'|'grey'
interface SpinnerProps {
  color?:Colors
  bigger?:boolean
}

export function Spinner({ color, bigger = false }:SpinnerProps) {
  return (

    <div className={`lds-ring ${color} ${bigger ? 'bigger' : ''}`}>
      <div />
      <div />
      <div />
      <div />
    </div>

  );
}
