import React, { ReactNode } from 'react';
import EmployJobDetailArea from '@/app/components/dashboard/employ/job-detail-area';

type Props = {
  children?: ReactNode;
  params?: any;
};

const EmployDashboardJobDetailLayout: React.FC<Props> = ({
  children,
  params,
}) => {
  return <EmployJobDetailArea params={params}>{children}</EmployJobDetailArea>;
};

export default EmployDashboardJobDetailLayout;
