'use server';

import {
  getAllInterviewType,
  updateInterviewInterviewer,
  getInterviewById,
  updateInterview,
  getInterviewerNameByNik,
  getInterviewerEmailByNik,
  createInterview,
  getAllInterviewPlace,
  getAllInterviewMessageTemplate,
  getAllInterviewer,
} from '@/lib/services/job-vacancies/service';
import { sendEmail } from '@/lib/services/messages/email/service';
import moment from 'moment';
import _ from 'lodash';
import {
  validateCandidateIdAndJobVacancyId,
  validateInterviewerNik,
  validateInterviewId,
  validateInterviewSchema,
} from '../validation';
import * as crypto from '@/lib/utils/utils';
import { success } from '@/utils/message';

export async function getAllInterviewTypeData() {
  const data = await getAllInterviewType();

  return data;
}

export async function getAllInterviewerData() {
  const data = await getAllInterviewer();

  return data;
}

export async function getAllInterviewMessageTemplateData() {
  const data = await getAllInterviewMessageTemplate();

  return data;
}

export async function getAllInterviewPlaceData() {
  const data = await getAllInterviewPlace();

  return data;
}

export async function insertInterview(candidateId, jobVacancyId, values) {
  const decryptedCandidateId = await crypto.decryptData(candidateId);

  const decryptedJobVacancyId = await crypto.decryptData(jobVacancyId);

  if (decryptedCandidateId && decryptedJobVacancyId) {
    const validate = validateCandidateIdAndJobVacancyId.safeParse({
      candidateId: decryptedCandidateId,
      jobVacancyId: decryptedJobVacancyId,
    });

    if (validate.success) {
      const validateInterviewData = validateInterviewSchema.safeParse(values);

      if (validateInterviewData.success) {
        const response = await createInterview(
          validate?.data?.candidateId,
          validate?.data?.jobVacancyId,
          validateInterviewData?.data,
        );

        // if (response && response?.length) {
        //   return response;
        // }

        if (response && !_.isEmpty(response)) {
          // console.info(response);

          const emailResponse = await (async () => {
            const email = [];

            const candidateEmailResponse = await sendEmail(
              response?.candidates?.users?.email,
              'Interview Invitation',
              response?.message,
            );

            if (candidateEmailResponse?.success) {
              await updateInterview(response?.interviewId, true);
            }

            email.push({
              ...candidateEmailResponse,
              role: '',
              name: response?.candidates?.users?.name,
              email: response?.candidates?.users?.email,
            });

            if (response?.interviewers && response?.interviewers?.length) {
              for (const nik of response?.interviewers) {
                const interviewerEmail = await getInterviewerEmailByNik(nik);

                const interviewerEmailResponse = await sendEmail(
                  interviewerEmail,
                  'Interview Invitation',
                  "<p>You've been invited to an interview.</p>",
                );

                if (interviewerEmailResponse?.success) {
                  await updateInterviewInterviewer(
                    response?.interviewId,
                    nik,
                    true,
                  );
                }

                email.push({
                  ...interviewerEmailResponse,
                  role: 'Interviewer',
                  name: await getInterviewerNameByNik(nik),
                  email: interviewerEmail,
                });
              }
            }

            // await Promise.all(
            //   response?.interviewers?.map(async (nik) => {
            //     const interviewerEmail = await getInterviewerEmailByNik(nik);

            //     const interviewerEmailResponse = await sendEmail(
            //       interviewerEmail,
            //       'Interview Invitation',
            //       "<p>You've been invited to an interview.</p>",
            //     );

            //     email.push({
            //       ...interviewerEmailResponse,
            //       role: 'interviewer',
            //       name: await getInterviewerNameByNik(nik),
            //       email: interviewerEmail,
            //     });
            //   }),
            // );

            return email;
          })();

          return emailResponse;

          // if (emailResponse && emailResponse?.length) {
          //   return {
          //     success: true,
          //     message: 'Interview Created Successfully',
          //     email: emailResponse,
          //   };
          // }

          // return {
          //   success: true,
          //   message: 'Interview Created Successfully',
          // };
        }

        // return response;

        return {
          success: false,
          message: 'Failed to Create Interview',
        };
      } else {
        console.log(validateInterviewData.error);

        return {
          success: false,
          message: 'Failed to Create Interview',
          error: validateInterviewData?.error?.flatten(),
        };
      }
    } else {
      console.log(validate.error);

      return {
        success: false,
        message: 'Candidate or Job Vacancy Not Valid',
      };
    }
  }

  return {
    success: false,
    message: 'Candidate or Job Vacancy Not Valid',
  };
}

export async function resendEmail(
  role: 'candidate' | 'interviewer',
  interviewId,
  interviewerNik = '',
) {
  const validate = validateInterviewId.safeParse({
    interviewId,
  });

  if (validate.success) {
    const interviewData = await getInterviewById(validate?.data?.interviewId);

    if (interviewData && !_.isEmpty(interviewData)) {
      if (role === 'candidate') {
        const isEmailSent = interviewData?.isEmailSent;

        if (isEmailSent) {
          return {
            success: false,
            message: 'Email Already Sent',
          };
        } else {
          const response = await sendEmail(
            interviewData?.candidateStates?.candidates?.users?.email,
            'Interview Invitation',
            interviewData?.message,
          );

          if (response?.success) {
            await updateInterview(validate?.data?.interviewId, true);
          }

          return {
            ...response,
            role: 'Candidate',
            name: interviewData?.candidateStates?.candidates?.users?.name,
            email: interviewData?.candidateStates?.candidates?.users?.email,
          };
        }
      } else if (role === 'interviewer') {
        const validateNik = validateInterviewerNik.safeParse({
          interviewerNik,
        });

        if (validateNik.success) {
          const isEmailSent = interviewData?.interviewInterviewers?.find(
            (data) =>
              data?.interviewerNIK === validateNik?.data?.interviewerNik,
          )?.isEmailSent;

          if (isEmailSent) {
            return {
              success: false,
              message: 'Email Already Sent',
            };
          } else {
            const interviewerEmail = await getInterviewerEmailByNik(
              validateNik?.data?.interviewerNik,
            );

            const response = await sendEmail(
              interviewerEmail,
              'Interview Invitation',
              "<p>You've been invited to an interview.</p>",
            );

            if (response?.success) {
              await updateInterviewInterviewer(
                validate?.data?.interviewId,
                validateNik?.data?.interviewerNik,
                true,
              );
            }

            return {
              ...response,
              role: 'Interviewer',
              name: await getInterviewerNameByNik(
                validateNik?.data?.interviewerNik,
              ),
              email: interviewerEmail,
            };
          }
        } else {
          console.log(validateNik.error);

          return {
            success: false,
            message: 'Failed to Send Email',
          };
        }
      }
    }

    return {
      success: false,
      message: 'Failed to Send Email',
    };
  } else {
    console.log(validate.error);

    return {
      success: false,
      message: 'Failed to Send Email',
    };
  }

  // if (role === 'Candidate) {
  //   const decryptedCandidateId = await crypto.decryptData(candidateId);

  //   if (decryptedCandidateId) {
  //     const validate = validateCandidateIdAndInterviewId.safeParse({
  //       candidateId: decryptedCandidateId,
  //       interviewId,
  //     });

  //     if (validate.success) {
  //       const interviewData = await getInterviewById(
  //         validate?.data?.interviewId,
  //       );

  //       if (interviewData && !_.isEmpty(interviewData)) {
  //       }

  //       const response = await sendEmail(
  //         validate?.data?.receiver,
  //         validate?.data?.subject,
  //         validate?.data?.html,
  //       );

  //       if (response.success) {
  //         await updateInterview(response?.interviewId, true);
  //       }

  //       return response;
  //     } else {
  //       console.log(validate.error);

  //       return {
  //         success: false,
  //         message: 'Failed to Send Email',
  //       };
  //     }
  //   }
  // }

  // const validate = validateSendEmail.safeParse({
  //   candidateId,
  //   interviewerNik,
  //   interviewId,
  // });
}
