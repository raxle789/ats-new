import { getJobVacancyData } from '@/lib/actions/job-vacancies/job-vacancy-details/action';
import InterviewListArea from '../../applicants/interview-list-area';
import { Status } from '@/status/applicant-status';
import AssessmentListArea from '../../applicants/assessment-list-area';
import ApplicantListArea from '../../applicants/applicant-list-area';
import EmployJobDetailItem from './job-detail-item';
import * as crypto from '@/lib/utils/utils';

const EmployJobDetailArea = async ({ params, searchParams }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const jobVacancyData = await (async () => {
    if (params?.id) {
      return await getJobVacancyData(params?.id);
    } else {
      return {};
    }
  })();

  return (
    <>
      {/* {status === Status.APPLICANT ? (
        <ApplicantListArea
          jobVacancyId={jobVacancyData?.jobId}
          status={Status.APPLICANT}
          perPage={Number(perPage)}
          offset={Number(offset)}
        />
      ) : (
        <AssessmentListArea
          jobVacancyId={jobVacancyData?.jobId}
          status={Status.ASSESSMENT}
          perPage={Number(perPage)}
          offset={Number(offset)}
        />
      )} */}
      <EmployJobDetailItem
        jobVacancyData={jobVacancyData}
        perPage={Number(perPage)}
        offset={Number(offset)}
        listArea={[
          {
            id: Status.APPLICANT,
            content: (
              <ApplicantListArea
                jobVacancyId={jobVacancyData?.jobId}
                status={Status.APPLICANT}
                perPage={Number(perPage)}
                offset={Number(offset)}
              />
            ),
          },
          {
            id: Status.ASSESSMENT,
            content: (
              <AssessmentListArea
                jobVacancyId={jobVacancyData?.jobId}
                status={Status.ASSESSMENT}
                perPage={Number(perPage)}
                offset={Number(offset)}
              />
            ),
          },
          {
            id: Status.INTERVIEW,
            content: (
              <InterviewListArea
                jobVacancyId={jobVacancyData?.jobId}
                status={Status.INTERVIEW}
                perPage={Number(perPage)}
                offset={Number(offset)}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default EmployJobDetailArea;
