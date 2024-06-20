import React from 'react';
import { Status } from '@/status/applicant-status';
import ReferenceCheckListArea from '@/app/components/applicants/reference-check-list-area';

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
    <ReferenceCheckListArea
      params={params}
      searchParams={searchParams}
      status={Status?.REFCHECK}
    />
  );
};

export default EmployDashboardJobDetailRefCheck;
