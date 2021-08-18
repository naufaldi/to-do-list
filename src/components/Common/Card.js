import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white px-4 py-6 rounded-md  transition-all transform hover:scale-105">
      {children}
    </div>
  );
};

export default Card;
