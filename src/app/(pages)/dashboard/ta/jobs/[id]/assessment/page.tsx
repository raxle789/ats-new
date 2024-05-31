import React, { Suspense } from 'react';
import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import { Status } from '@/status/applicant-status';
import AssessmentListArea from '@/app/components/applicants/assessment-list-area';

export const revalidate = 0;

const EmployDashboardJobDetailAssessment = ({ params, searchParams }) => {
  return (
    <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
      <AssessmentListArea
        params={params}
        searchParams={searchParams}
        status={Status?.ASSESSMENT}
      />
    </Suspense>
  );
};

export default EmployDashboardJobDetailAssessment;
