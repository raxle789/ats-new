import React from 'react';
import EmployJobDetailArea from '@/app/components/dashboard/employ/job-detail-area';

export const revalidate = 0;

const EmployDashboardJobDetailsPage = ({ params, searchParams }) => {
  return <EmployJobDetailArea params={params} searchParams={searchParams} />;
};

export default EmployDashboardJobDetailsPage;
