import './style.css';
import { ReactNode, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown,MdExpandLess } from "react-icons/md";



interface DropdownProps {
  selectedValue: string;
  className?: string;
  children: ReactNode;
}

export const Dropdown = ({selectedValue = '', className = '', children}: DropdownProps) => {

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(!isActive);
  } ,[selectedValue]);

  return (
    <div className={`dropdown ${className}`}>
      <div onClick={() => setIsActive(!isActive)} className="dropdown__btn">
        {selectedValue}
    
        {isActive ? <MdExpandLess />  : <MdOutlineKeyboardArrowDown />}
      </div>

      <div className="dropdown__content" style={{ display: isActive ? 'block' : 'none' }}>
        {children}
      </div>

    </div>
  );

};