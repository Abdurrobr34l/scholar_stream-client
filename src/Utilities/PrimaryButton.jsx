import React from 'react';
import { Link } from 'react-router';

const PrimaryButton = ({path, buttonName}) => {
  return (
    <Link to={path} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary">
      {buttonName}
    </Link>
  );
};

export default PrimaryButton;