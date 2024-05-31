import React, { Suspense } from 'react';
import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import { Status } from '@/status/applicant-status';
import ApplicantListArea from '@/app/components/applicants/applicant-list-area';

export const revalidate = 0;

const EmployDashboardJobDetailApplicant = ({ params, searchParams }) => {
  return (
    <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
      <ApplicantListArea
        params={params}
        searchParams={searchParams}
        status={Status.APPLICANT}
      />
    </Suspense>
  );
};

export default EmployDashboardJobDetailApplicant;
