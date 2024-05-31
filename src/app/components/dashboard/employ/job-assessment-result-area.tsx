import JobAssessmentResultItem from './job-assessment-result-modal';
import { getApplicantAssessmentDetail } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';

const JobAssessmentResultArea = async ({ candidateId, jobVacancyId }) => {
  const assessmentDetail = await (async () => {
    if (candidateId && jobVacancyId) {
      return await getApplicantAssessmentDetail(candidateId, jobVacancyId);
    } else {
      return {};
    }
  })();

  return <JobAssessmentResultItem />;
};

export default JobAssessmentResultArea;
