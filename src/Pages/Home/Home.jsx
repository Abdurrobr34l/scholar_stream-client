import React from 'react';
import PageTitle from '../../Utilities/PageTitle';
import HeroSection from './HomeSections/HeroSection';
import TopScholarships from './HomeSections/TopScholarships';

const Home = () => {
  return (
    <div>
      <PageTitle title="Home"></PageTitle>

      <HeroSection></HeroSection>
      <TopScholarships></TopScholarships>
    </div>
  );
};

export default Home;