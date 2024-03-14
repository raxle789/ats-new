'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import EmployProfileArea from '@/app/components/dashboard/employ/profile-area';

const EmployDashboardProfilePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <EmployProfileArea setIsOpenSidebar={setIsOpenSidebar} />;
};

export default EmployDashboardProfilePage;
