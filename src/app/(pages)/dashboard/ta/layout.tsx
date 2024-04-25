'use client';

import React from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '../../../components/dashboard/employ/aside';
// import DashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';
import TaDashboardHeader from '@/app/components/dashboard/employ/ta-dashboard-header';
import { useAppSelector } from '@/redux/hook';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpenSidebar = useAppSelector((state) => state.sidebar.isOpen);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <EmployAside />
        <div className={`dashboard-body ${isOpenSidebar ? 'show' : ''}`}>
          <div className="position-relative">
            <TaDashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
