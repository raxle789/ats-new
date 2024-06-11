'use server';

import InterviewListItem from './interview-list-item';
import EmployJobDetailSkeleton from '@/ui/skeleton';
import { Suspense } from 'react';
import { encryptObject } from '@/lib/utils/utils';
import { handleApplicant } from '../message/confirm';
import {
  getAllInterviewTypeData,
  resendEmail,
  insertInterview,
  getAllInterviewPlaceData,
  getAllInterviewMessageTemplateData,
  getAllInterviewerData,
} from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-interview/action';
// import JobAssessmentResultArea from '../dashboard/employ/job-assessment-result-area';
// import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/actions/job-vacancies/job-vacancy-details/action';
import React from 'react';

type Props = {
  params?: any;
  searchParams?: any;
  status?: string | any;
};

const InterviewListArea: React.FC<Props> = async ({
  params,
  searchParams,
  status,
}) => {
  // const pathname = usePathname();
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  type fieldData = {
    data: {
      candidateId: string;
      candidatePhoto: string | null;
      candidateName: string | undefined;
      candidateLastPosition: string;
      candidateLastEducation: string | null;
      candidateExpectedSalary: string | number;
      candidateYearOfExperience: string | number;
      candidateStatus: string | null;
      candidateSkills: string[];
      candidateScore: string;
    }[];
    total: number;
  };

  const applicantData: never[] | fieldData | any = await (async () => {
    if (params?.id) {
      return await getAllApplicantDataByJobVacancyIdAndStateName(
        params?.id,
        status,
        offset,
        Number(perPage),
      );
    } else {
      return [];
    }
  })();

  // console.info(applicantData.data[0].candidateInterviews[0]);

  const typeData = await (async () => {
    const data = await getAllInterviewTypeData();

    if (data) {
      return data;
    } else {
      return [];
    }
  })();

  const interviewerData = await (async () => {
    const data = await getAllInterviewerData();

    if (data) {
      return data;
    } else {
      return [];
    }
  })();

  const messageTemplateData = await (async () => {
    const data = await getAllInterviewMessageTemplateData();

    if (data) {
      return data;
    } else {
      return [];
    }
  })();

  const placeData = await (async () => {
    const data = await getAllInterviewPlaceData();

    if (data) {
      return data;
    } else {
      return [];
    }
  })();

  return (
    // <Suspense fallback={<EmployJobDetailSkeleton rows={2} />}>
    <InterviewListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={params?.id}
      typeData={typeData}
      interviewerData={interviewerData}
      messageTemplateData={messageTemplateData}
      placeData={placeData}
      insertInterview={insertInterview}
      resendEmail={resendEmail}
      handleApplicant={handleApplicant}
      encryptObject={encryptObject}
    />
    // </Suspense>
  );
};

export default InterviewListArea;
