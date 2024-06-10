'use server';

import {
  getInterviewResultData,
  submitInterviewResult,
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
      decryptedQuery?.interviewId &&
      params?.interviewerNik
    ) {
      const data = await getInterviewResultData(
        decryptedQuery?.candidateId,
        params?.id,
        decryptedQuery?.interviewId,
        params?.interviewerNik,
      );

      if (data?.interviewResultData?.statusName) {
        return { ...data, mode: 'update' };
      } else {
        return { ...data, mode: 'create' };
      }
    } else {
      return {};
    }
  })();

  // console.info(params);

  // console.info(
  //   interviewResultData.interviewHistoryData[0].interviewInterviewers,
  // );

  return (
    <InterviewResultItem
      interviewResultData={interviewResultData}
      submitInterviewResult={submitInterviewResult}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default InterviewResultArea;
