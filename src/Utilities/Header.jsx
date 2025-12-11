import React from 'react';
import useAuth from '../Hooks/useAuth';
import Container from './Container';
import Logo from './Logo';
import { NavLink } from 'react-router';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
import UserDropdownMenu from './UserDropdownMenu';

const Header = () => {
  const { user } = useAuth();

  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/all-scholarships", pathName: "All Scholarships" }
  ];

  return (
    <header className="py-3.5 shadow-sm">
      <Container className="navbar">

        {/* Dropdown menu & Logo */}
        <div className="navbar-start flex-row-reverse w-full justify-between lg:w-auto lg:flex-1">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            {/* Mobile dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 w-60 px-5 py-4 shadow gap-3 right-4"
            >
              {navigationLinks.map(({ id, path, pathName }) => (
                <li key={id}>
                  <NavLink to={path} className="navlink text-md">
                    {pathName}
                  </NavLink>
                </li>
              ))}

              {!user && (
                <div className="flex gap-2 md:hidden">
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
              )}
            </ul>
          </div>

          <Logo />
        </div>

        {/* Navigation Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">
            {navigationLinks.map(({ id, path, pathName }) => (
              <li key={id}>
                <NavLink to={path} className="navlink">
                  {pathName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons & Profile */}
        <div className="hidden md:flex navbar-end gap-3 lg:flex-1">
          {user ? (
            <UserDropdownMenu user={user} />
          ) : (
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
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
