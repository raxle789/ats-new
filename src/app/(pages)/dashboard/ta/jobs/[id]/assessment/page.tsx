import React from 'react';
import { Status } from '@/status/applicant-status';
import AssessmentListArea from '@/app/components/applicants/assessment-list-area';

export const revalidate = 0;

type Props = {
  params: any;
  searchParams: any;
};

const EmployDashboardJobDetailAssessment: React.FC<Props> = ({
  params,
  searchParams,
}) => {
  return (
    // <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
    <AssessmentListArea
      params={params}
      searchParams={searchParams}
      status={Status?.ASSESSMENT}
    />
    // </Suspense>
  );
};

export default EmployDashboardJobDetailAssessment;
