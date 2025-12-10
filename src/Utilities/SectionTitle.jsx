import React from 'react';

const SectionTitle = ({sectionName}) => {
  return (
    <>
     <h2 className='text-3xl md:text-4xl font-bold mb-6 text-center md:mb-10 lg:text-5xl xl:mb-12 xl:text-6xl'>{sectionName}</h2> 
    </>
  );
};

export default SectionTitle;