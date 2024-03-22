import React from 'react';

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
    <button onClick={toggle}>
      <span
        className="material-symbols-outlined"
        style={{
          transform: `rotate(${isOpen ? 180 : 0}deg)`,
          transition: 'all 0.25s',
        }}
      >
        <i className="bi bi-caret-down"></i>
      </span>
    </button>
  );
};
