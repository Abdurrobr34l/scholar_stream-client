import React from 'react';
import PageTitle from '../../Utilities/PageTitle';
import HeroSection from './HomeSections/HeroSection';
import TopScholarships from './HomeSections/TopScholarships';
import SuccessStories from './HomeSections/SuccessStories';
import ContactUs from './HomeSections/ContactUs';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const Home = () => {
  return (
    <div>
      <PageTitle title="Home"></PageTitle>

      <HeroSection></HeroSection>
      <TopScholarships></TopScholarships>
      <SuccessStories></SuccessStories>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;