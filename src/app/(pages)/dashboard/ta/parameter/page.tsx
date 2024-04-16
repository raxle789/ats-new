import React from 'react';
import EmployParameterArea from '@/app/components/dashboard/employ/job-parameter-area';

export const revalidate = 0;

const EmployDashboardParameterPage = ({ searchParams }: any) => {
  return <EmployParameterArea searchParams={searchParams} />;
};

export default EmployDashboardParameterPage;
