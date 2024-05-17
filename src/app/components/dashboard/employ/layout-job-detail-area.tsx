import { getJobVacancyData } from '@/lib/action/job-vacancies/job-vacancy-details/action';
import EmployJobArea from './job-area';
import EmployLayoutJobDetailItem from './layout-job-detail-item';
import { Status } from '@/status/applicant-status';
import AssessmentListArea from '../../applicants/assessment-list-area';
import ApplicantListArea from '../../applicants/applicant-list-area';
import EmployJobDetailItem from './job-detail-item';
import * as crypto from '@/lib/utils/utils';
import EmployJobDetailArea from './job-detail-area';

const EmployLayoutJobDetailArea = async ({ params, searchParams }) => {
  const jobVacancyData = await (async () => {
    if (params?.id) {
      return await getJobVacancyData(params?.id);
    } else {
      return {};
    }
  })();

  return (
    <>
      <EmployLayoutJobDetailItem jobVacancyData={jobVacancyData}>
        <EmployJobDetailArea
          params={params}
          searchParams={searchParams}
          status={Status.APPLICANT}
        />
      </EmployLayoutJobDetailItem>
    </>
  );
};

export default EmployLayoutJobDetailArea;
