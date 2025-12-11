import React from 'react';
import { Link } from 'react-router';

const UserDropdownMenu = ({ user }) => {
  const role = user?.role || "User";

  return (
    <div className="dropdown dropdown-end">

      {/* Avatar Button */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-16! avatar">
        <div className="w-16 rounded-full">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
          />
        </div>
      </div>

      {/* Dropdown Content */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-4 w-60 bg-base-100 shadow rounded-box p-4 z-20"
      >
        {/* User Info */}
        <div className="border-b pb-3 mb-3">
          <h3 className="font-semibold text-lg">{user?.displayName || "No Name"}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>

          <p className="badge badge-soft badge-info mt-2 px-2 py-1 font-semibold">
            {role}
          </p>
        </div>

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            className="text-base font-semibold hover:text-primary hover:bg-transparent"
          >
            Dashboard
          </Link>
        </li>

        {/* Logout */}
        <li>
          <button className="text-error text-base font-semibold hover:text-red-600 hover:bg-transparent">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;
