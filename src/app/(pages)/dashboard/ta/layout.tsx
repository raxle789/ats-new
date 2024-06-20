'use client';

import React, { useState, useEffect, Suspense } from 'react';
import DashboardPageSkeleton from './loading';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '../../../components/dashboard/employ/aside';
// import DashboardHeader from '@/app/components/dashboard/candidate/dashboard-header';
import TaDashboardHeader from '@/app/components/dashboard/employ/ta-dashboard-header';
import { useAppSelector } from '@/redux/hook';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpenSidebar = useAppSelector((state) => state.sidebar.isOpen);
  const pathname = usePathname();
  const [overflowState, setOverflowState] = useState(false);

  useEffect(() => {
    // digunakan untuk mengatur position sticky pada display cv di interview report form
    const keywords = ['dashboard', 'ta', 'jobs', 'interview', 'result'];
    const matchedKeyword = keywords.find((keyword) =>
      pathname.includes(keyword),
    );
    if (matchedKeyword) {
      setOverflowState(true);
    } else {
      setOverflowState(false);
    }
  }, [pathname]);
  return (
    <Wrapper>
      <div
        className={`main-page-wrapper ${overflowState ? 'overflow-x-visible' : 'overflow-x-hidden'}`}
      >
        <EmployAside />
        <div className={`dashboard-body ${isOpenSidebar ? 'show' : ''}`}>
          <div className="position-relative">
            <TaDashboardHeader />
            <Suspense fallback={<DashboardPageSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
