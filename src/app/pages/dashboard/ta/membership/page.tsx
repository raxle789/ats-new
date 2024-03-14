'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import EmployMembershipArea from '@/app/components/dashboard/employ/membership-area';

const EmployDashboardMembershipPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <EmployMembershipArea setIsOpenSidebar={setIsOpenSidebar} />;
};

export default EmployDashboardMembershipPage;
