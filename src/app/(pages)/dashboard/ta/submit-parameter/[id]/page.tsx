import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater';

export const revalidate = 0;

type IProps = {
  params: string;
};

const jobParameterPage: React.FC<IProps> = ({ params }) => {
  return <EmployJobParameter params={params} />;
};

export default jobParameterPage;
