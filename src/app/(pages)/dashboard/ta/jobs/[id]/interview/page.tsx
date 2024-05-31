import React, { Suspense } from 'react';
import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import { Status } from '@/status/applicant-status';
import InterviewListArea from '@/app/components/applicants/interview-list-area';

export const revalidate = 0;

const EmployDashboardJobDetailInterview = ({ params, searchParams }) => {
  return (
    <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
      <InterviewListArea
        params={params}
        searchParams={searchParams}
        status={Status.INTERVIEW}
      />
    </Suspense>
  );
};

export default EmployDashboardJobDetailInterview;
