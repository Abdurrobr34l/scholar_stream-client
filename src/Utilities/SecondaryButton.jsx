import React from 'react';

const SecondaryButton = ({ buttonName }) => {
  return (
    <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold border border-primary text-primary bg-white transition-colors duration-300 ease-linear 
        hover:bg-accent-content hover:text-white hover:border-accent-content">
      {buttonName}
    </button>
  );
};

export default SecondaryButton;