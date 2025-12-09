import React from 'react';
import Container from './Container';
import { NavLink } from 'react-router';

const Header = () => {
  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/all-scholarships", pathName: "All Scholarships" }
  ]

  return (
    <header className="bg-clr shadow-sm">
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
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        {/*//* NAVIGATION MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {
              navigationLinks.map(({ id, path, pathName }) => (
                <li key={id}>
                  <NavLink to={path}>{pathName}</NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        {/*//* LOGIN, LOGOUT & USER PROFILE */}
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </Container>
    </header>
  )
};

export default Header;