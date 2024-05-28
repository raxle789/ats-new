'use server';

import AssessmentListItem from './assessment-list-item';
import JobAssessmentResultArea from '../dashboard/employ/job-assessment-result-area';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

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
    />
  );
};

export default AssessmentListArea;
