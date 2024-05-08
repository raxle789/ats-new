'use server';

import * as crypto from '@/lib/utils/utils';
import AssessmentListItem from './assessment-list-item';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/action/job-vacancies/job-vacancy-details/action';

const AssessmentListArea = async ({
  jobVacancyId,
  status,
  perPage,
  offset,
}) => {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  const applicantData = await (async () => {
    if (decryptedJobVacancyId) {
      return await getAllApplicantDataByJobVacancyIdAndStateName(
        decryptedJobVacancyId,
        status,
        offset,
        perPage,
      );
    } else {
      return [];
    }
  })();

  return <AssessmentListItem applicantData={applicantData} />;
};

export default AssessmentListArea;
