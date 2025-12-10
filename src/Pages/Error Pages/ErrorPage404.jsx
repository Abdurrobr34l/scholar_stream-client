import React from 'react';
import notFoundImg from '../../assets/404.png';
// import { HeadProvider } from 'react-head';
import { Link } from 'react-router';
import PrimaryButton from '../../Utilities/PrimaryButton';
import PageTitle from '../../Utilities/PageTitle';

const ErrorPage = () => {
  return (
    <>
<PageTitle title="Error 404"/>

      <section className="flex flex-col items-center justify-center min-h-screen gap-6 py-10 text-center bg-white">
        {/* 404 Image */}
        <img
          src={notFoundImg}
          alt="Page Not Found"
          className="w-80 md:w-[500px] lg:w-[700px] object-contain"
        />

        {/* 404 Heading */}
        <h1 className="text-6xl font-bold text-[#EEF2F6]! ">404</h1>

        {/* Subheading */}
        <h2 className="text-2xl font-semibold text-[#757983]!">
          Oops! Page not found.
        </h2>

        {/* Description */}
        <p className="text-base text-center text-gray-500! max-w-md">
          The page you’re looking for might have been removed or is temporarily
          unavailable. Let’s guide you back home where everything’s cozy.
        </p>

        {/* Go Home Button */}
        <PrimaryButton path="/" buttonName="Go to Home"></PrimaryButton>
      </section>
    </>
  );
};

export default ErrorPage;