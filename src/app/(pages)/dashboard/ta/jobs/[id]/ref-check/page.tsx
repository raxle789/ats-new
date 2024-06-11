import React from 'react';
import { Status } from '@/status/applicant-status';
import RefCheckListArea from '@/app/components/applicants/ref-check-list-area';

export const revalidate = 0;

type Props = {
  searchParams?: any;
  params?: any;
};

const EmployDashboardJobDetailRefCheck: React.FC<Props> = ({
  params,
  searchParams,
}) => {
  return (
    <RefCheckListArea
      params={params}
      searchParams={searchParams}
      status={Status.REF_CHECK}
    />
  );
};

export default EmployDashboardJobDetailRefCheck;
