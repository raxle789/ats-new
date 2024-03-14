'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import DashboardSettingArea from '@/app/components/dashboard/candidate/dashboard-setting';

const EmployDashboardSettingPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar} />;
};

export default EmployDashboardSettingPage;
