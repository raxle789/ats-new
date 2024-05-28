'use client';

import { Checkbox, Popover, Spin, Modal, message } from 'antd';
import { assignApplicantToAnotherState } from '@/lib/actions/job-vacancies/job-vacancy-details/action';
import { registerAssessment } from '@/lib/actions/job-vacancies/job-vacancy-details/job-vacancy-detail-assessment/action';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';

const { confirm } = Modal;

export function handleApplicant(
  handleType: 'assignAssessment' | 'detailAssessment' | 'assignInterview',
  candidateId,
  jobVacancyId,
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
  }
}
