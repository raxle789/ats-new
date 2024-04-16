import React from 'react';
// import DashboardHeader from '../../components/dashboard/candidate/dashboard-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <DashboardHeader /> */}
      {children}
    </>
  );
}
