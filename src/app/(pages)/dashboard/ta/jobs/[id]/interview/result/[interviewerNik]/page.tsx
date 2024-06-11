import { Suspense } from 'react';
import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import InterviewResultArea from '@/app/components/dashboard/employ/interview-result-area';

const InterviewResultPage = ({ params, searchParams }) => {
  return (
    <Suspense fallback={<EmployJobDetailSkeleton rows={4} />}>
      <InterviewResultArea params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default InterviewResultPage;
