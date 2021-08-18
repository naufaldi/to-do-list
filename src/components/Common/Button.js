import React from 'react';
import clsx from 'clsx';

const Button = ({ children, ariaLabel, variant, onClick, className }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
        ' flex justify-center items-center rounded-lg transition-all group ',
        variant === 'delete' && 'hover:bg-red-700 bg-red-300',
        variant === 'edit' && 'hover:bg-green-700 bg-green-300',
        variant === 'primary' && 'hover:bg-blue-300 bg-blue-700 text-white',
        variant === 'primary-light' &&
          'hover:bg-blue-700 bg-blue-300 text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
