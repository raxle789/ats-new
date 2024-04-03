import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater';

export const revalidate = 0;

const jobParameterPage = ({ searchParams }) => {
  return <EmployJobParameter searchParams={searchParams} />;
};

export default jobParameterPage;
