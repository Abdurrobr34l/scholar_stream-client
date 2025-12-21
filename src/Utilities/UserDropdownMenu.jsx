import React from 'react';
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import LoadingSpinner from './LoadingSpinner';

const UserDropdownMenu = ({ user }) => {
  const { logOut } = useAuth()
  const { role, loading } = useUserRole(user?.email);

  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="dropdown dropdown-end">

      {/* Avatar Button */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-16! avatar">
        <div className="w-16 rounded-full">
          <img
            src={user?.photoURL || "https://img.icons8.com/ultraviolet/40/user-male-circle.png"}
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
        <div className="relative mb-3 pb-3 border-b ">
          <h3 className="font-semibold text-lg">{user?.displayName || "No Name"}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="badge badge-soft badge-info absolute right-0 -top-2 mt-2 px-2 py-1 font-bold">
            {role}
          </p>
        </div>

        {/* Dashboard */}
        <li>
          <Link
            to="dashboard/my-profile"
            className="text-base text-primary font-semibold hover:text-accent hover:bg-transparent"
          >
            Dashboard
          </Link>
        </li>

        {/* Logout */}
        <li>
          <button onClick={logOut} className="text-error text-base font-semibold hover:text-red-600 hover:bg-transparent">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;
