'use server';

import ReferenceCheckListItem from './reference-check-list-item';
// import { Suspense } from 'react';
// import EmployJobDetailSkeleton from '@/app/components/loadings/employ-job-detail-skeleton';
import { handleApplicant } from '../message/confirm';
// import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyId } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

type Props = {
  params?: any;
  searchParams?: any;
  status?: string | any;
};

const ReferenceCheckListArea: React.FC<Props> = async ({
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
      return await getAllApplicantDataByJobVacancyId(
        params?.id,
        offset,
        Number(perPage),
      );
    } else {
      return [];
    }
  })();

  return (
    <ReferenceCheckListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={params?.id}
      handleApplicant={handleApplicant}
    />
  );
};

export default ReferenceCheckListArea;
