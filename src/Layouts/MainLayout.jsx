import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Utilities/Header';
import Footer from '../Utilities/Footer';

const MainLayout = () => {
  return (
    <>
      <Header></Header>

      <main className='min-h-[calc(100vh-100px-128px)]'>
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;