import React from 'react';
import { Outlet } from 'react-router';
import Container from '../Utilities/Container';
import Header from '../Utilities/Header';
import Footer from '../Utilities/Footer';

const MainLayout = () => {
  return (
    <>
        {/* <header className=' mb-5 py-5 lg:mb-9'> */}
        <Header></Header>
      {/* </header> */}

    <Container>
      {/* <main className='min-h-[calc(100vh-68px-403px)]'> */}
      <main>
        <Outlet></Outlet>
      </main>
    </Container>

      {/* <footer className='mt-6 pb-4 sm:mt-10 sm:pb-6 md:mt-14 md:pb-8 lg:mt-20 lg:pb-10 xl:mt-[100px] xl:pb-12 2xl:pb-[50px]'> */}
        <Footer></Footer>
      {/* </footer> */}
    </>
  );
};

export default MainLayout;