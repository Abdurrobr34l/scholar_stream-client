import React from 'react';
import Container from './Container';
import { NavLink } from 'react-router';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
import UserDropdownMenu from './UserDropdownMenu';


const Header = () => {
  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/all-scholarships", pathName: "All Scholarships" }
  ]

  const user = {
    displayName: "Abdur Rob",
    photoURL: "https://i.pravatar.cc/150?img=3"
  };

  return (
    <header className="py-3.5 shadow-sm">
      <Container className='navbar'>
        {/*//* DROPDOWN MENU & LOGO */}
        <div className="navbar-start flex-row-reverse w-full justify-between lg:w-auto lg:flex-1">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:fill-accent! hover:bg-transparent hover:border-transparent hover:shadow-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 22" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-2 w-70 px-5 py-2.5 right-4! shadow gap-3">
              {
                navigationLinks.map(({ id, path, pathName }) => (
                  <li key={id}>
                    <NavLink to={path} className="navlink text-md">{pathName}</NavLink>
                  </li>
                ))
              }
              <div className='flex gap-2 md:hidden'>
                  <PrimaryButton
                    path="/login"
                    buttonName="Login"
                    icon={IoLogInOutline}
                  />

                  <SecondaryButton
                    path="/register"
                    buttonName="Register"
                    icon={IoPersonAddOutline}
                  />
                </div>
            </ul>
          </div>

          {/*//* Logo */}
          <Logo></Logo>
        </div>

        {/*//* NAVIGATION MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">
            {
              navigationLinks.map(({ id, path, pathName }) => (
                <li key={id}>
                  <NavLink to={path} className="navlink">{pathName}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        {/*//* LOGIN, LOGOUT & USER PROFILE */}
        <div className="hidden md:flex navbar-end gap-3 lg:flex-1">
          {
            user
              ?
              (
                <>
                  <PrimaryButton
                    path="/login"
                    buttonName="Login"
                    icon={IoLogInOutline}
                  />

                  <SecondaryButton
                    path="/register"
                    buttonName="Register"
                    icon={IoPersonAddOutline}
                  />
                </>
              )
              :
              (
                <UserDropdownMenu user={user}></UserDropdownMenu>
              )
          }
        </div>
      </Container>
    </header>
  )
};

export default Header;