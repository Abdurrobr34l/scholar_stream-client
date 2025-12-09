import React from "react";
import { Link } from "react-router";

const SecondaryButton = ({ path, buttonName, icon: Icon }) => {
  return (
    <Link
      to={path}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-primary text-primary bg-white transition-colors duration-300 ease-linear 
        hover:bg-accent-content hover:text-white hover:border-accent-content"
    >
      {Icon && <Icon className="text-lg" />} 
      {buttonName}
    </Link>
  );
};

export default SecondaryButton;


// import React from 'react';
// import { Link } from 'react-router';

// const SecondaryButton = ({path, buttonName }) => {
//   return (
//     <Link to={path} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-primary text-primary bg-white transition-colors duration-300 ease-linear 
//         hover:bg-accent-content hover:text-white hover:border-accent-content">
//       {buttonName}
//     </Link>
//   );
// };

// export default SecondaryButton;