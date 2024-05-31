'use client';

import { Checkbox, Popover, Spin, Modal, message } from 'antd';
import { resendEmail } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-interview/action';
import { assignApplicantToAnotherState } from '@/lib/actions/job-vacancies/job-vacancy-details/action';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';

const { confirm } = Modal;

export function handleApplicant(
  handleType:
    | 'assignAssessment'
    | 'detailAssessment'
    | 'resendAssessment'
    | 'assignInterview'
    | 'resendCandidateInterviewInvitation',
  candidateId,
  jobVacancyId,
  interviewId,
  api,
  router,
  setLoading,
  status,
) {
  if (handleType === 'assignAssessment') {
    confirm({
      ...confirmations?.assignConfirmation('assessment'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await registerAssessment(
              candidateId,
              jobVacancyId,
            );

            if (validate?.success) {
              messages.success(api, validate?.message);

              router.refresh();
            } else {
              messages.error(api, validate?.message);

              router.refresh();
            }

            resolve(setLoading(false));
          }, 2000);
        }).catch((e) =>
          console.log('Failed Assign This Candidate to Assessment: ', e),
        );
      },
      onCancel() {
        router.refresh();

        setLoading(false);
      },
    });
  } else if (handleType === 'resendAssessment') {
    confirm({
      ...confirmations?.resendAssessmentConfirmation(),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await registerAssessment(
              candidateId,
              jobVacancyId,
            );

            if (validate?.success) {
              messages.success(
                api,
                'Successfully Resend Assessment to This Candidate',
              );

              router.refresh();
            } else {
              if (
                validate?.message ===
                'Failed to Assign This Candidate to Assessment'
              ) {
                messages.error(
                  api,
                  'Failed Resend Assessment to This Candidate',
                );
              } else {
                messages.error(api, validate?.message);
              }

              router.refresh();
            }

            resolve(setLoading(false));
          }, 2000);
        }).catch((e) =>
          console.log('Failed Resend Assessment to This Candidate', e),
        );
      },
      onCancel() {
        router.refresh();

        setLoading(false);
      },
    });
  } else if (handleType === 'assignInterview') {
    confirm({
      ...confirmations?.assignConfirmation('interview'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await assignApplicantToAnotherState(
              candidateId,
              jobVacancyId,
              status,
            );

            if (validate?.success) {
              messages.success(api, validate?.message);

              router.refresh();
            } else {
              messages.error(api, validate?.message);

              router.refresh();
            }

            resolve(setLoading(false));
          }, 2000);
        }).catch((e) =>
          console.log('Failed Assign This Candidate to Interview', e),
        );
      },
      onCancel() {
        router.refresh();

        setLoading(false);
      },
    });
  } else if (handleType === 'resendCandidateInterviewInvitation') {
    confirm({
      ...confirmations.resendEmailConfirmation('candidate'),
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            const validate = await resendEmail('candidate', interviewId);

            if (validate?.success) {
              messages.success(
                api,
                `${validate?.message} to ${validate?.name} (${validate?.role})`,
              );

              resolve(setLoading(false));
            } else {
              messages.error(api, validate?.message);

              resolve(setLoading(false));
            }
          }, 2000);
        }).catch((e) => console.log('Failed Resend Email to Candidate', e));
      },
      onCancel() {
        setLoading(false);

        // setButtonDisabled((prevState) => ({
        //   ...prevState,
        //   [`candidate${interviewId}`]: false,
        // }));
      },
    });
  }
}
