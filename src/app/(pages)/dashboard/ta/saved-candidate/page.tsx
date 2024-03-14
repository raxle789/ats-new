'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import SavedCandidateArea from '@/app/components/dashboard/employ/saved-candidate-area';

const EmployDashboardSavedCandidatePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return <SavedCandidateArea setIsOpenSidebar={setIsOpenSidebar} />;
};

export default EmployDashboardSavedCandidatePage;
