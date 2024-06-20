import React from 'react';
import { Status } from '@/status/applicant-status';
import OfferingListArea from '@/app/components/applicants/offering-list-area';

export const revalidate = 0;

type Props = {
  searchParams?: any;
  params?: any;
};

const EmployDashboardJobDetailOffering: React.FC<Props> = ({
  params,
  searchParams,
}) => {
  return (
    <OfferingListArea
      params={params}
      searchParams={searchParams}
      status={Status?.OFFERING}
    />
  );
};

export default EmployDashboardJobDetailOffering;
