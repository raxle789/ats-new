import React from 'react';
import EmployJobParameter from '@/app/components/dashboard/employ/submit-job-paramater-area';

export const revalidate = 0;

type IProps = {
  params: string;
};

const JobParameterPage: React.FC<IProps> = ({ params }) => {
  return <EmployJobParameter params={params} />;
};

export default JobParameterPage;
