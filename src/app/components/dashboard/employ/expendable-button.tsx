import React from 'react';
import DropdownIcon from '@/assets/images/icon/dropdown.png';
import Image from 'next/image';

// Definisikan tipe untuk props
interface ExpendableButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ExpendableButton: React.FC<ExpendableButtonProps> = ({
  isOpen,
  toggle,
}) => {
  return (
    <button className="expanded-button" onClick={toggle}>
      <span className="material-symbols-outlined">
        <Image
          src={DropdownIcon}
          alt="dropdown-icon"
          className={`dropdown-icon ${isOpen ? 'rotated' : 'not-rotated'}`}
        />
      </span>
    </button>
  );
};
