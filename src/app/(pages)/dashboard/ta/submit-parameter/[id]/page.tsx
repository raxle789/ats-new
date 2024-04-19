import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater-area';

export const revalidate = 0;

const jobParameterPage = ({ params }) => {
  return <EmployJobParameter params={params} />;
};

export default jobParameterPage;
