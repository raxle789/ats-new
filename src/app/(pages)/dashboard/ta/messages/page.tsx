'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import DashboardMessage from '@/app/components/dashboard/candidate/dashboard-message';

const EmployDashboardMessagesPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <DashboardMessage setIsOpenSidebar={setIsOpenSidebar} />;
};

export default EmployDashboardMessagesPage;
