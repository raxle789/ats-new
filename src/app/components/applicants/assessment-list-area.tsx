'use server';

import AssessmentListItem from './assessment-list-item';
import { registerAssessment } from '@/lib/action/job-vacancies/job-vacancy-details/job-vacancy-details-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/action/job-vacancies/job-vacancy-details/action';

const AssessmentListArea = async ({
  jobVacancyId,
  status,
  perPage,
  offset,
}) => {
  const applicantData = await (async () => {
    if (jobVacancyId) {
      return await getAllApplicantDataByJobVacancyIdAndStateName(
        jobVacancyId,
        status,
        offset,
        perPage,
      );
    } else {
      return [];
    }
  })();

  return (
    <AssessmentListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={jobVacancyId}
      registerAssessment={registerAssessment}
    />
  );
};

export default AssessmentListArea;