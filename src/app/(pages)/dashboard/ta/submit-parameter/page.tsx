import 'server-only';

import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater';

const jobParameterPage = ({ searchParams }) => {
  return <EmployJobParameter searchParams={searchParams} />;
};

export default jobParameterPage;
