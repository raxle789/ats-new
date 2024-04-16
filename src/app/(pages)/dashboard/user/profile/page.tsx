'use client';
import React, { useState } from 'react';
// import Wrapper from '@/layouts/wrapper';
// import CandidateAside from '@/app/components/dashboard/candidate/aside';
import DashboardProfileArea from '@/app/components/dashboard/candidate/dashboard-profile-area';

const CandidateProfilePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <DashboardProfileArea setIsOpenSidebar={setIsOpenSidebar} />;
};

export default CandidateProfilePage;
