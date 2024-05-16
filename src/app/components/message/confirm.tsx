'use client';

import { Checkbox, Popover, Spin, Modal, message } from 'antd';
import { registerAssessment } from '@/lib/action/job-vacancies/job-vacancy-details/job-vacancy-details-assessment/action';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';

const { confirm } = Modal;

export function handleApplicant(
  handleType: 'assignAssessment',
  candidateId,
  jobVacancyId,
  api,
  router,
  setLoading,
) {
  switch (handleType) {
    case 'assignAssessment': {
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
    }
  }
}
