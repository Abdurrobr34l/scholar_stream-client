import React from 'react';
import { Link } from 'react-router';

const UserDropdownMenu = ({ user }) => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom w-16" data-tip="Profile">
        <div className="border rounded-full" data-tip="Profile">
          <img
            alt="User avatar"
            src={user?.photoURL || "https://via.placeholder.com/150"}
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-4 px-3 py-6 w-52 bg-base-100 shadow rounded-box z-1 gap-2"
      >
        <li>
          <Link to="/dashboard" className='text-base font-semibold transition-all duration-300 ease-linear hover:bg-transparent hover:text-primary hover:scale-[101%]'>Dashboard</Link>
        </li>

        <li>
          <button className="text-error text-base font-semibold transition-all duration-300 ease-linear hover:bg-transparent hover:text-red-600 hover:scale-[101%]">Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;