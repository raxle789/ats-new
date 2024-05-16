'use server';

import ApplicantListItem from './applicant-list-item';
import { getAllApplicantDataByJobVacancyId } from '@/lib/action/job-vacancies/job-vacancy-details/action';

const ApplicantListArea = async ({ jobVacancyId, status, perPage, offset }) => {
  const applicantData = await (async () => {
    if (jobVacancyId) {
      return await getAllApplicantDataByJobVacancyId(
        jobVacancyId,
        offset,
        perPage,
      );
    } else {
      return [];
    }
  })();

  return (
    <ApplicantListItem status={status} applicantData={applicantData?.data} />
  );
};

export default ApplicantListArea;
