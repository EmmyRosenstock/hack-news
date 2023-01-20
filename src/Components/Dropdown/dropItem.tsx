import { ReactNode } from 'react';
import classnames from 'classnames';


interface DropdownProps {
  value: string;
  current: string | any;
  children: ReactNode;
  onItemClick: (value: string) => void;
}

export const DropdownItem = ({value, current, children, onItemClick}: DropdownProps) => {

  return (
    <div className={classnames('dropdown__item', { selected: value === current })}
      onClick={() => onItemClick(value)}>
      {children}
      
    </div>
  );
};