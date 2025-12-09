import React from 'react';
import { Outlet } from 'react-router';
import Container from '../Utilities/Container';
import Header from '../Utilities/Header';
import Footer from '../Utilities/Footer';

const MainLayout = () => {
  return (
    <>
      <Header></Header>

      <Container>
        <main className='min-h-[calc(100vh-100px-128px)] py-5 md:py-10 lg:py-[50px]'>
          <Outlet></Outlet>
        </main>
      </Container>

      <Footer></Footer>
    </>
  );
};

export default MainLayout;