import React from 'react';
// import DropdownIconBlack from '@/assets/images/icon/dropdown.png';
import DropdownIconWhite from '@/assets/images/icon/dropdown-putih.png';
import DropdownIconBlue from '@/assets/images/icon/dropdown-biru.png';
import Image from 'next/image';

// Definisikan tipe untuk props
interface ExpendableButtonProps {
  isActive: boolean;
  isOpen: boolean;
  toggle: () => void;
}

export const ExpendableButtonAside: React.FC<ExpendableButtonProps> = ({
  isActive,
  isOpen,
  toggle,
}) => {
  return (
    <button className="expanded-button-aside" onClick={toggle}>
      <span className="material-symbols-outlined">
        {isActive === true && (
          <Image
            src={DropdownIconWhite}
            alt="dropdown-icon"
            className={`dropdown-icon-aside ${isOpen ? 'rotated' : 'not-rotated'}`}
          />
        )}
        {isActive === false && (
          <Image
            src={DropdownIconBlue}
            alt="dropdown-icon"
            className={`dropdown-icon-aside ${isOpen ? 'rotated' : 'not-rotated'}`}
          />
        )}
      </span>
    </button>
  );
};
