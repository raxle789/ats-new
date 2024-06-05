import React from 'react';
import { newData } from '@/lib/services/fpk/service';
import InterviewResultArea from '@/app/components/dashboard/employ/interview-result-area';

const InterviewResultPage = async () => {
  const data = await (async () => {
    return await newData();
  })();

  return <InterviewResultArea data={data.file_base?.toString()} />;
};

export default InterviewResultPage;
