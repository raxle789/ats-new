'use server';

import * as crypto from '@/lib/utils/utils';
import ApplicantListItem from './applicant-list-item';
import { getAllApplicantDataByJobVacancyId } from '@/lib/action/job-vacancies/job-vacancy-details/action';

const ApplicantListArea = async ({ jobVacancyId, perPage, offset }) => {
  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  const applicantData = await (async () => {
    if (decryptedJobVacancyId) {
      return await getAllApplicantDataByJobVacancyId(
        decryptedJobVacancyId,
        offset,
        perPage,
      );
    } else {
      return [];
    }
  })();

  return <ApplicantListItem applicantData={applicantData} />;
};

export default ApplicantListArea;
