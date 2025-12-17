import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../../Utilities/Logo';
import { GoSidebarCollapse } from "react-icons/go";
import { FaUser, FaUsers, FaPlusCircle, FaList, FaChartBar, FaClipboardList, FaStar, FaHome } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import UserDropdownMenu from '../../Utilities/UserDropdownMenu';

const DashboardSidebar = () => {
  const { user } = useAuth();
  const { role, loading } = useUserRole(user?.email);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // Role Based Links
  const dashboardLinks = {
    Admin: {
      links: [
        { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
        { name: "My Profile", icon: <ImProfile />, path: "/dashboard/profile" },
        { name: "Add Scholarship", icon: <FaPlusCircle />, path: "/dashboard/add-scholarship" },
        { name: "Manage Scholarships", icon: <FaList />, path: "/dashboard/manage-scholarships" },
        { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/manage-users" },
        { name: "Analytics", icon: <FaChartBar />, path: "/dashboard/analytics" },
      ],
    },
    Moderator: {
      links: [
        { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
        { name: "My Profile", icon: <ImProfile />, path: "/dashboard/profile" },
        { name: "Manage Applications", icon: <FaClipboardList />, path: "/dashboard/manage-applications" },
        { name: "All Reviews", icon: <FaStar />, path: "/dashboard/all-reviews" },
      ],
    },
    Student: {
      links: [
        { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
        { name: "My Profile", icon: <ImProfile />, path: "/dashboard/profile" },
        { name: "My Applications", icon: <FaClipboardList />, path: "/dashboard/my-applications" },
        { name: "My Reviews", icon: <FaStar />, path: "/dashboard/my-reviews" },
      ],
    },
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-200 bg-none! hover:bg-none! pl-6">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-ghost lg:absolute lg:-left-12 z-50 p-0! text-2xl text-primary hover:text-accent hover:border-transparent hover:bg-transparent!">
            <GoSidebarCollapse />
          </label>

          <div className="py-4 px-6">
            <Logo />
          </div>

          <div className="hidden absolute right-0 md:flex items-center gap-4 p-4 mr-10">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-accent-content ring-offset-accent-content ring-offset-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" />
                ) : (
                  <div className="flex items-center justify-center bg-primary text-white">
                    <ImProfile className="text-2xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="leading-tight">
              <h3 className="font-semibold text-base">
                {user?.displayName || "Anonymous User"}
              </h3>
              <p className="text-md font-semibold capitalize text-accent">
                {role}
              </p>
            </div>
          </div>
          <div>

          </div>
        </nav>

        {/* Page content */}
        <div className="p-6 min-h-[calc(100vh-104px)] bg-white">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>


        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64">
          <ul className="menu w-full grow gap-4">

            {/* Role Title */}
            <li className='hover:bg-none!'>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-16 mb-6 text-accent-content hover:bg-transparent! cursor-default lg:mt-7 lg:mb-10" data-tip="User Role">
                {/* <span className='text-xl'><FaUser /></span> */}
                <span className="is-drawer-close:hidden">
                  <h2 className={`text-xl font-semibold uppercase text-accent-content! pl-1 -mt-1 ${dashboardLinks[role]?.labelClass}`}>
                    {role}
                  </h2>
                </span>
              </button>
            </li>

            {/* Role Based Links */}
            {dashboardLinks[role]?.links.map((item) => (
              <li key={item.name} className='text-primary transition-colors duration-100 ease-linear hover:text-white hover:border-transparent hover:bg-primary!'>
                <Link
                  to={item.path}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                  data-tip={item.name}
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span className="is-drawer-close:hidden">{item.name}</span>
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
