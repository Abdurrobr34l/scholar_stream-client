import React from 'react';
import DashboardSidebar from '../Pages/Dashboard.jsx/DashboardSidebar';
import PageTitle from '../Utilities/PageTitle';

const DashboardLayout = () => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;