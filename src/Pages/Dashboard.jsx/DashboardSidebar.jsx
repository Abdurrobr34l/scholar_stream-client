import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../../Utilities/Logo';
import { GoSidebarCollapse } from "react-icons/go";
import { FaUser, FaUsers, FaPlusCircle, FaList, FaChartBar, FaClipboardList, FaStar } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';

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
        { name: "My Profile", icon: <ImProfile />, path: "/dashboard/profile" },
        { name: "Add Scholarship", icon: <FaPlusCircle />, path: "/dashboard/add-scholarship" },
        { name: "Manage Scholarships", icon: <FaList />, path: "/dashboard/manage-scholarships" },
        { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/manage-users" },
        { name: "Analytics", icon: <FaChartBar />, path: "/dashboard/analytics" },
      ],
    },
    Moderator: {
      links: [
        { name: "My Profile", icon: <ImProfile />, path: "/dashboard/profile" },
        { name: "Manage Applications", icon: <FaClipboardList />, path: "/dashboard/manage-applications" },
        { name: "All Reviews", icon: <FaStar />, path: "/dashboard/all-reviews" },
      ],
    },
    Student: {
      links: [
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
        <nav className="navbar w-full bg-base-300 bg-none! hover:bg-none! pl-6">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-ghost p-0! text-2xl text-primary hover:text-accent hover:border-transparent hover:bg-transparent!">
            <GoSidebarCollapse />
          </label>
          <div className="py-4 px-6">
            <Logo />
          </div>
        </nav>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>


        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64">
          <ul className="menu w-full grow gap-4">

            {/* Role Title */}
            <li className='hover:bg-none!'>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-8 mb-10 text-accent-content hover:bg-transparent! cursor-default" data-tip="User Role">
                <span className='text-xl'><FaUser /></span>
                <span className="is-drawer-close:hidden">
                  <h2 className={`font-bold uppercase text-accent-content! pl-1 ${dashboardLinks[role]?.labelClass}`}>
                    {role}
                  </h2>
                </span>
              </button>
            </li>

            {/* Role Based Links */}
            {dashboardLinks[role]?.links.map((item) => (
              <li key={item.name} className='text-primary transition-all duration-300 ease-linear hover:text-white hover:border-transparent hover:bg-primary!'>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                  data-tip={item.name}
                >
                  <span className='text-lg'>{item.icon}</span>
                  <span className="is-drawer-close:hidden">{item.name}</span>
                </button>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
