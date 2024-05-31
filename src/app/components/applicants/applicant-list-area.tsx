'use server';

import ApplicantListItem from './applicant-list-item';
import { handleApplicant } from '../message/confirm';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyId } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

const ApplicantListArea = async ({ params, searchParams, status }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const applicantData = await (async () => {
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
    <ApplicantListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={params?.id}
      handleApplicant={handleApplicant}
    />
  );
};

export default ApplicantListArea;
