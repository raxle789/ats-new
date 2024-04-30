import React from 'react';
import EmployJobArea from '@/app/components/dashboard/employ/job-area';

export const revalidate = 0;

const EmployDashboardJobsPage = ({ searchParams }) => {
  return <EmployJobArea searchParams={searchParams} />;
};

export default EmployDashboardJobsPage;
