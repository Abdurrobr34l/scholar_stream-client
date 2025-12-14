import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Utilities/Header';
import Footer from '../Utilities/Footer';
import ScrollToTop from '../Components/ScrollToTop';

const MainLayout = () => {
  return (
    <>
      <Header></Header>

      <main className='min-h-[calc(100vh-100px-128px)]'> {/*min-h-[calc(100vh-100px-128px))] ----- 228px = header(100px) + footer(128px) */}
        <ScrollToTop />
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;