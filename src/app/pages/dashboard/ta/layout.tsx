'use client';

import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '../../../components/dashboard/employ/aside';
import DashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';

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
            <DashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
