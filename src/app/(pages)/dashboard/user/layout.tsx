'use client';

import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import UserAside from '@/app/components/dashboard/user/aside';
import UserHeader from '@/app/components/dashboard/user/user-header';
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
        <UserAside />
        <div className={`dashboard-body ${isOpenSidebar ? 'show' : ''}`}>
          <div className="position-relative">
            <UserHeader />
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
