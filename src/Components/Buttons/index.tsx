import './style.css';
import { ChangeEvent, Fragment, useState } from 'react';

interface ButtonProps {
  options: string[];
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export const Button = ({options, onChange}: ButtonProps) => {

  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="buttont">
      {
        options.map((option, index) => {
          return (
            <Fragment key={index}>
              <input type="radio" id={`radio-${option}`} name={`switch-${option}`} value={option} checked={option === selected} onChange={e => {setSelected(e.target.value); onChange(e); }}/>
              <label htmlFor={`radio-${option}`}>{option}</label>
            </Fragment>
          );
        })
      }
    </div>
  );
};