'use server';

import AssessmentListItem from './assessment-list-item';
import EmployJobDetailSkeleton from '@/ui/skeleton';
import { Suspense } from 'react';
import { handleApplicant } from '../message/confirm';
// import JobAssessmentResultArea from '../dashboard/employ/job-assessment-result-area';
// import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

type Props = {
  params?: any;
  searchParams?: any;
  status?: string | any;
};

const AssessmentListArea: React.FC<Props> = async ({
  params,
  searchParams,
  status,
}) => {
  // const pathname = usePathname();
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  type fieldData = {
    data: {
      candidateId: string;
      candidatePhoto: string | null;
      candidateName: string | undefined;
      candidateLastPosition: string;
      candidateLastEducation: string | null;
      candidateExpectedSalary: string | number;
      candidateYearOfExperience: string | number;
      candidateStatus: string | null;
      candidateSkills: string[];
      candidateScore: string;
    }[];
    total: number;
  };

  const applicantData: never[] | fieldData | any = await (async () => {
    if (params?.id) {
      return await getAllApplicantDataByJobVacancyIdAndStateName(
        params?.id,
        status,
        offset,
        Number(perPage),
      );
    } else {
      return [];
    }
  })();

  return (
    // <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
    <AssessmentListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={params?.id}
      handleApplicant={handleApplicant}
    />
    // </Suspense>
  );
};

export default AssessmentListArea;
