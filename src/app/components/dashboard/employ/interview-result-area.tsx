'use server';

import {
  getInterviewResultData,
  insertInterviewResult,
} from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-interview/action';
import _ from 'lodash';
import { decryptObject } from '@/lib/utils/utils';
import InterviewResultItem from './interview-result-item';

const InterviewResultArea = async ({ params, searchParams }) => {
  const interviewResultData = await (async () => {
    const decryptedQuery = await decryptObject(searchParams?.q);

    // console.info(decryptedQuery);

    if (
      !_.isEmpty(decryptedQuery) &&
      decryptedQuery?.candidateId &&
      params?.id &&
      params?.interviewerNik
    ) {
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

  // console.info(interviewResultData);

  return (
    <InterviewResultItem
      interviewResultData={interviewResultData}
      insertInterviewResult={insertInterviewResult}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default InterviewResultArea;
