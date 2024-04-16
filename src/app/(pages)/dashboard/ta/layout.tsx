'use client';

import React from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '../../../components/dashboard/employ/aside';
// import DashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';
import TaDashboardHeader from '@/app/components/dashboard/employ/ta-dashboard-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        <EmployAside />
        <div className="dashboard-body">
          <div className="position-relative">
            <TaDashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
