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
    <header className="bg-clr py-3.5 shadow-sm">
      <Container className='navbar'>
        {/*//* DROPDOWN MENU & LOGO */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {
                navigationLinks.map(({ id, path, pathName }) => (
                  <li key={id}>
                    <NavLink to={path}>{pathName}</NavLink>
                  </li>
                ))
              }
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
        <div className="navbar-end gap-3">
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