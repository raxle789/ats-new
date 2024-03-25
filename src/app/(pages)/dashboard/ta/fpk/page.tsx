import React from 'react';
import EmployJobFpk from '@/app/components/dashboard/employ/job-fpk';

const jobFpkPage = async ({ searchParams }) => {
  return <EmployJobFpk searchParams={searchParams} />;
};

export default jobFpkPage;
