import React from 'react';
import EmployJobArea from '@/app/components/dashboard/employ/job-area';

export const revalidate = 0;

type Props = {
  searchParams: any;
};

const EmployDashboardJobsPage: React.FC<Props> = ({ searchParams }) => {
  return <EmployJobArea searchParams={searchParams} />;
};

export default EmployDashboardJobsPage;
