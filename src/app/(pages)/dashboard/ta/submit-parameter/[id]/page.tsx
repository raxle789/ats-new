import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater';

export const revalidate = 0;

const jobParameterPage = ({ params }) => {
  return <EmployJobParameter params={params} />;
};

export default jobParameterPage;
