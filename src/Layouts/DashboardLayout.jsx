import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div>
      DashboardLayout
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;