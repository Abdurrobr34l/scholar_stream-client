import React from 'react';
import { Link } from 'react-router';
import LogoImage from '../assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className='flex items-center gap-2 text-2xl font-bold'>
      <img src={LogoImage} alt="It is scholar streame logo image" className='size-14'/>
      ScholarStream
    </Link>
  );
};

export default Logo;