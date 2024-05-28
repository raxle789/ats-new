'use server';

import InterviewListItem from './interview-list-item';
import {
  getAllInterviewTypeData,
  resendEmail,
  insertInterview,
  getAllInterviewPlaceData,
  getAllInterviewMessageTemplateData,
  getAllInterviewerData,
} from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-interview/action';
import JobAssessmentResultArea from '../dashboard/employ/job-assessment-result-area';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import { getAllApplicantDataByJobVacancyIdAndStateName } from '@/lib/actions/job-vacancies/job-vacancy-details/action';

const InterviewListArea = async ({ jobVacancyId, status, perPage, offset }) => {
  const applicantData = await (async () => {
    if (jobVacancyId) {
      return await getAllApplicantDataByJobVacancyIdAndStateName(
        jobVacancyId,
        status,
        offset,
        perPage,
      );
    } else {
      return [];
    }
  })();

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
    <InterviewListItem
      status={status}
      applicantData={applicantData?.data}
      jobVacancyId={jobVacancyId}
      typeData={typeData}
      interviewerData={interviewerData}
      messageTemplateData={messageTemplateData}
      placeData={placeData}
      insertInterview={insertInterview}
      resendEmail={resendEmail}
    />
  );
};

export default InterviewListArea;
