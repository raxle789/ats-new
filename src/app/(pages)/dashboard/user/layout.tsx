'use client';
import React from 'react';
import Wrapper from '@/layouts/wrapper';
// import EmployAside from '@/app/components/dashboard/employ/aside';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
// import DashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';
import CandidateDashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';
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
        <CandidateAside />
        <div className={`dashboard-body ${isOpenSidebar ? 'show' : ''}`}>
          <div className="position-relative">
            <CandidateDashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
