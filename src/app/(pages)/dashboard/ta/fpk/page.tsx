import React from 'react';
import EmployJobFpk from '@/app/components/dashboard/employ/job-fpk';

export const revalidate = 0;

const JobFpkPage = async ({ searchParams }: any) => {
  return <EmployJobFpk searchParams={searchParams} />;
};

export default JobFpkPage;
