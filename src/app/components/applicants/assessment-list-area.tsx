'use server';

import AssessmentListItem from './assessment-list-item';
import { handleApplicant } from '../message/confirm';
import JobAssessmentResultArea from '../dashboard/employ/job-assessment-result-area';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

const AssessmentListArea = async ({ params, searchParams, status }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const applicantData = await (async () => {
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
    <AssessmentListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={params?.id}
      handleApplicant={handleApplicant}
    />
  );
};

export default AssessmentListArea;
