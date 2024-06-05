'use server';

import { getInterviewResultData } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-interview/action';
import { decryptObject } from '@/lib/utils/utils';
import InterviewResultItem from './interview-result-item';

const InterviewResultArea = async ({ params, searchParams }) => {
  const interviewResultData = await (async () => {
    const decryptedQuery = await decryptObject(searchParams?.q);

    if (decryptedQuery?.candidateId && params?.id && params?.interviewerNik) {
      return await getInterviewResultData(
        decryptedQuery?.candidateId,
        params?.id,
        params?.interviewerNik,
      );
    } else {
      return {};
    }
  })();

  // console.info(params);

  // console.info(interviewResultData.interviewHistory[0].interviewers);

  return <InterviewResultItem interviewResultData={interviewResultData} />;
};

export default InterviewResultArea;
