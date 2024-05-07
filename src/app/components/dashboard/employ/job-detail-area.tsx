import {
  getJobVacancyData,
  getAllApplicantDataByJobVacancyId,
} from '@/lib/action/job-vacancies/job-vacancy-details/action';
import EmployJobDetailItem from './job-detail-item';
import * as crypto from '@/lib/utils/utils';

const EmployJobDetailArea = async ({ params, searchParams }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const decryptedJobVacancyId = await crypto.decryptData(params?.id);

  const jobVacancyData = await (async () => {
    if (decryptedJobVacancyId) {
      return await getJobVacancyData(decryptedJobVacancyId)
        .then((res) => {
          const data = res ?? {};

          // console.info(data);

          return data;
        })
        .catch((e) => {
          console.log('Failed Getting Job Vacancy Data: ', e);

          return {};
        });
    }

    return {};
  })();

  return <EmployJobDetailItem jobVacancyData={jobVacancyData} />;
};

export default EmployJobDetailArea;
