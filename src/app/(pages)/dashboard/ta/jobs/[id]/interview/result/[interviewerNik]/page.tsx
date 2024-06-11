import { Suspense } from 'react';
import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import InterviewResultArea from '@/app/components/dashboard/employ/interview-result-area';

type Props = {
  params?: {} | any;
  searchParams?: {} | any;
};

const InterviewResultPage: React.FC<Props> = ({ params, searchParams }) => {
  return (
    <Suspense fallback={<EmployJobDetailSkeleton rows={4} />}>
      <InterviewResultArea params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default InterviewResultPage;
