import React from 'react';
import EmployJobFpk from '@/app/components/dashboard/employ/job-fpk';

export const revalidate = 0;

const jobFpkPage = ({ searchParams }) => {
  return <EmployJobFpk searchParams={searchParams} />;
};

export default jobFpkPage;
