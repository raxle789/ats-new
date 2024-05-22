'use server';

import { deleteSession, getUserSession, setUserSession } from '../Sessions';
// import { userRegister1 } from '../validations/Register';
import bcrypt from 'bcrypt';
import { transformToArrayOfObject, TypeTransformedDocument } from './utils';
import { v4 as uuidV4 } from 'uuid';
import prisma from '@/root/prisma';
import { Dayjs } from 'dayjs';
import { FieldType } from '@/app/components/forms/register-form';
import { FieldType as TypeSubmittedValues2 } from '@/app/components/forms/stage-3-form';
import { REGISTER, REGISTER_2 } from '../validations/Register';
import { sendOTP } from './verifications';

/**
 * Trial Test
 */
interface TypeSubmittedValues1 extends FieldType {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: Dayjs | Date | string;
}

export async function TrialTestFunction(
  submittedValues1: TypeSubmittedValues2,
  documemts: object[],
) {
  console.log('Submitted Values 2: ', submittedValues1);
  const { expectedSalary, ...restOfExperiences } = submittedValues1.experience;
  const transformedSubmittedValues = {
    ...submittedValues1,
    families: transformToArrayOfObject(submittedValues1.families),
    certification: transformToArrayOfObject(submittedValues1.certification),
    language: transformToArrayOfObject(submittedValues1.language),
    experience: transformToArrayOfObject(restOfExperiences),
  };
  console.info('transformed submit values: ', transformedSubmittedValues);
  const validating = REGISTER_2.safeParse(transformedSubmittedValues);
  if (!validating.success) {
    const zodErrors = validating.error.flatten().fieldErrors;
    return console.info('zod errors: ', zodErrors);
  }
  console.info('validated: ', validating.data);
  // console.log('is number: ', Number(submittedValues1.certification['2'].certificationName.toString()));
  // console.log('not a number: ', Number('axngh'));
  // if(Number('Serawak')) {
  //   console.log('YES')
  // }
  // console.info('Documents: ', documemts);
  // console.log('is instance of Date: ', submittedValues1.families['0'].dateOfBirth, new Date(submittedValues1.families['0'].dateOfBirth));
}

/* ============================================================================== */
interface TypeReturnedServerAction {
  success: boolean;
  data: any | null;
  errors: any | null;
  message: string | '';
}

export async function RegisterPhase1(
  submittedValues1: TypeSubmittedValues1,
): Promise<TypeReturnedServerAction> {
  /* Validation Input */
  console.info('validating input...');
  const validateRegisterPhase1 = REGISTER.safeParse({
    ...submittedValues1,
    dateOfBirth: new Date(submittedValues1.dateOfBirth.toString()),
  });
  if (!validateRegisterPhase1.success) {
    const zodErrors = validateRegisterPhase1.error.flatten().fieldErrors;
    return {
      success: false,
      data: null,
      errors: zodErrors,
      message: 'Fields Validation Error',
    };
  }
  console.info('INPUT VALIDATED:', validateRegisterPhase1.data);
  /* Begin Transactions */
  console.info('storing register phase 1 data...');
  const doRegisterPhase1 = await prisma.$transaction(
    async (tx) => {
      /* Cheking Email */
      console.info('checking email...');
      const isEmailExist = await tx.users.findUnique({
        where: {
          email: submittedValues1.email,
        },
      });
      if (isEmailExist)
        return {
          success: false,
          data: null,
          errors: {
            email: ['This email already used by another candidate'],
          },
          message: 'Email already used',
        };
      console.info('checking phone number... - skipped');
      /*  Checking Phone Number */
      /*
    const isPhoneNumberExist = await tx.candidates.findUnique({
      where: {
        phone_number: submittedValues1.phoneNumber
      }
    });
    if(isPhoneNumberExist) return {
      success: false,
      data: null,
      errors: {
        phoneNumber: ['Phone number already used by another candidate']
      },
      message: 'Phone number already used'
    };
    */
      /* Create Users */
      console.info('creating user...');
      console.info('hashing user password...');
      const hashedPassword = await bcrypt.hash(submittedValues1.password, 10);
      const createUser = await tx.users.create({
        data: {
          name: submittedValues1.fullname,
          email: submittedValues1.email.toLowerCase(),
          password: hashedPassword,
        },
      });
      if (!createUser)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed to create users',
        };
      console.info('creating candidate...');
      const createCandidate = await tx.candidates.create({
        data: {
          userId: createUser.id,
          phone_number: submittedValues1.phoneNumber,
          date_of_birth: new Date(submittedValues1.dateOfBirth.toString()),
        },
      });
      if (!createCandidate)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed to create candidate',
        };
      console.info('set register session...');
      await setUserSession(
        'reg',
        {
          user: {
            id: createUser.id,
            name: createUser.name,
            email: createUser.email,
          },
          candidate: {
            id: createCandidate.id,
            phone_number: createCandidate.phone_number,
            date_of_birth: createCandidate.date_of_birth,
          },
        },
        undefined,
      );
      console.info('transaction completed');
      console.info('sending otp...');
      const sendingOTP = await sendOTP({ email: createUser.email });
      if (!sendingOTP.success)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed to send OTP, please try register again:',
        };
      console.info(sendingOTP);
      return {
        success: true,
        data: {
          user: createUser,
          candidate: createCandidate,
        },
        errors: null,
        message: 'Register phase 1 success:',
      };
    },
    {
      timeout: 600000,
    },
  );
  /* close connection */
  await prisma.$disconnect();
  /* Return the transaction value */
  return doRegisterPhase1;
}

export async function RegisterPhase2(
  submittedValues2: TypeSubmittedValues2,
  documents: TypeTransformedDocument[],
) {
  /* validate input -> cannot be validated */
  console.info('SUBMITTED VALUE: ', submittedValues2);
  let expectedSalaryExist;
  let restOfExperiences;
  if ('experience' in submittedValues2) {
    const { expectedSalary, ...restOfExperiencesExist } =
      submittedValues2.experience;
    expectedSalaryExist = expectedSalary;
    restOfExperiences = restOfExperiencesExist;
  } else {
    return {
      success: false,
      data: null,
      errors: null,
      message: 'Please fill all the field',
    };
  }

  const transformedSubmittedValues2 = {
    ...submittedValues2,
    families: transformToArrayOfObject(submittedValues2.families),
    certification: transformToArrayOfObject(submittedValues2.certification),
    language: transformToArrayOfObject(submittedValues2.language),
    experience: transformToArrayOfObject(restOfExperiences), // current experience should be included
  };
  console.info('transformed submit values: ', transformedSubmittedValues2);
  const validateInput = REGISTER_2.safeParse(transformedSubmittedValues2);
  if (!validateInput.success) {
    const zodErrors = validateInput.error.flatten().fieldErrors;
    console.info('errors from zod on server-side: ', zodErrors);
    return {
      success: false,
      data: null,
      errors: zodErrors,
      message: 'Please fill in your spouse data',
    };
  }
  console.log('VALIDATED : ', validateInput.data);
  /* end of validation */
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  console.info('begin transaction register phase 2...');
  const doRegisterPhase2 = await prisma.$transaction(
    async (tx) => {
      /* PROFILE PHOTO */
      console.info('storing photo...');
      const storeProfilePhoto = await tx.documents.create({
        data: {
          saved_name: uuidV4(),
          original_name: documents[0].original_name,
          byte_size: documents[0].byte_size,
          path: 'no-path',
          file_base: Buffer.from(documents[0].file_base),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          documentTypeId: 1, // THE ID OF THE DOCUMENT TYPE
          candidate_id: regSession.candidate.id,
        },
      });
      if (!storeProfilePhoto)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store profile photo',
        };
      /* UPDATE CANDIDATE */
      console.info('updating candidate data...');
      const updateCandidate = await tx.candidates.update({
        where: {
          id: regSession.candidate.id,
        },
        data: {
          blood_type: submittedValues2.profile?.bloodType,
          ethnicity: submittedValues2.profile?.ethnicity,
          gender: submittedValues2.profile?.gender,
          maritalStatus: submittedValues2.profile?.maritalStatus,
          // Domicile doesnt exist on the form
          birthCity: submittedValues2.profile?.placeOfBirth?.toString(), // array of string (length 1)
          religion: submittedValues2.profile?.religion,
        },
      });
      if (!updateCandidate)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying update candidate profile',
        };
      // if address checkbox true, store it mean current address same as permanent address
      /* STORE ADDRESSES */
      console.info('decision addresses...');
      if (submittedValues2.address) {
        console.info('storing addresses...');
        const storeAddress = await tx.addresses.create({
          data: {
            candidateId: regSession.candidate.id,
            street: submittedValues2.address.permanentAddress as string,
            country: submittedValues2.address.country as string,
            city: submittedValues2.address.city?.toString() as string,
            zipCode: submittedValues2.address.zipCode as string,
            rt:
              submittedValues2.address.country === 'Indonesia'
                ? (submittedValues2.address.rt as string)
                : ' ',
            rw:
              submittedValues2.address.country === 'Indonesia'
                ? (submittedValues2.address.rw as string)
                : ' ',
            subdistrict:
              submittedValues2.address.country === 'Indonesia'
                ? (submittedValues2.address.subdistrict as string)
                : ' ',
            village:
              submittedValues2.address.country === 'Indonesia'
                ? (submittedValues2.address.village as string)
                : ' ',
            isCurrent: submittedValues2.address.currentAddress
              ? 'true'
              : 'false',
            currentAddress: submittedValues2.address.currentAddress ?? null,
            createdAt: new Date(Date.now()),
          },
        });
        if (!storeAddress)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying store address',
          };
      }
      /* STORE FAMILIES */
      const arrayOfFamilies = transformToArrayOfObject(
        submittedValues2.families,
      );
      console.info('transforming families to array of objects...');
      const transformedFamilies = arrayOfFamilies.map((family) => {
        return {
          candidateId: regSession.candidate.id,
          name: family.name,
          relationStatus: family.relation,
          gender: family.gender,
          dateOfBirth: new Date(family.dateOfBirth),
          createdAt: new Date(Date.now()),
        };
      });
      console.info('storing families...');
      const storeFamilies = await tx.families.createMany({
        data: transformedFamilies,
      });
      if (storeFamilies.count <= 0) {
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store families',
        };
      }
      /* STORE EDUCATION */
      console.info('storing education...');
      const storeEducation = await tx.educations.create({
        data: {
          candidateId: regSession.candidate.id,
          level: submittedValues2.education?.educationLevel,
          major:
            submittedValues2.education?.educationMajor?.toString() as string,
          start_year: new Date(
            submittedValues2.education?.startEduYear as string,
          ).getFullYear(),
          end_year: new Date(
            submittedValues2.education?.endEduYear as string,
          ).getFullYear(),
          university_name:
            submittedValues2.education?.schoolName?.toString() as string,
          cityOfSchool:
            submittedValues2.education?.cityOfSchool?.toString() as string,
          gpa: submittedValues2.education?.gpa as number,
          is_latest: false,
          is_graduate: false,
          created_at: new Date(Date.now()),
        },
      });
      if (!storeEducation)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store education',
        };
      /* STORE CERTIFICATIONS */
      if (submittedValues2.certification) {
        console.info('transforming certifications to array of obbjects');
        const arrayOfCertifications = transformToArrayOfObject(
          submittedValues2.certification,
        );
        const certificationsTransformFunction = async () => {
          const transformedCertifications = arrayOfCertifications.map(
            async (value) => {
              if (!Number(value.certificationName[0].toString())) {
                const storeCertificate = await tx.certificates.create({
                  data: {
                    name: value.certificationName[0],
                    createdAt: new Date(Date.now()),
                  },
                });
                // No-Guard Check
                // if(!storeCertificate) return {
                //   success: false,
                //   data: null,
                //   errors: null,
                //   message: 'Failed when trying store certificate to get certificate ID'
                // };
                return {
                  candidateId: regSession.candidate.id,
                  certificateId: storeCertificate.id,
                  institutionName: value.institution,
                  issuedDate: new Date(value.monthIssue.toString()),
                  created_at: new Date(Date.now()),
                };
              }
              return {
                candidateId: regSession.candidate.id,
                certificateId: Number(value.certificationName[0].toString()),
                institutionName: value.institution,
                issuedDate: new Date(value.monthIssue.toString()),
                created_at: new Date(Date.now()),
              };
            },
          );

          const results = await Promise.all(transformedCertifications);
          return results;
        };
        const certificationsData = await certificationsTransformFunction();
        console.info('storing certifications...');
        const storeCertifications = await tx.certifications.createMany({
          data: certificationsData,
        });
        if (!storeCertifications)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying store certifications',
          };
      }
      /* STORE SKILLS */
      if (submittedValues2.skills) {
        console.info('transforming skills to array of objects...');
        const skillsDefined = submittedValues2.skills;
        const skillsTransformFunction = async () => {
          const transformedSkills = skillsDefined.map(async (value) => {
            if (typeof value === 'string') {
              const storeSkill = await tx.skills.create({
                data: {
                  name: value,
                  createdAt: new Date(Date.now()),
                },
              });
              return {
                candidateId: regSession.candidate.id,
                skillId: storeSkill.id,
              };
            }
            return {
              candidateId: regSession.candidate.id,
              skillId: value,
            };
          });

          const result = await Promise.all(transformedSkills);
          return result;
        };
        const skillsData = await skillsTransformFunction();
        console.info('storing skills...');
        const storeSkills = await tx.candidateSkills.createMany({
          data: skillsData,
        });
        if (!storeSkills)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying store certifications',
          };
      }
      /* STORE LANGUAGE */
      console.info('transforming languages to array of objects...');
      const arrayOfLanguages = transformToArrayOfObject(
        submittedValues2.language,
      );
      const transformedLanguages = arrayOfLanguages.map((language) => {
        return {
          candidateId: regSession.candidate.id,
          name: language.name,
          level: language.level,
          createdAt: new Date(Date.now()),
        };
      });
      console.info('storing languages...');
      console.info('transformed languages...', transformedLanguages);
      const storeLanguages = await tx.languages.createMany({
        data: transformedLanguages,
      });
      if (!storeLanguages)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store languages',
        };
      /* STORE WORKING EXPERIENCES AND UPDATE EXPECTED SALARY */
      if (
        submittedValues2.experience &&
        Object.keys(submittedValues2.experience).length <= 1
      ) {
        console.info('candidate is fresh graduate...');
        const { expectedSalary } = submittedValues2.experience;
        console.info('updating candidate expected salaty as fresh graduate...');
        const updateCandidateExpectedSalary = await tx.candidates.update({
          where: {
            id: regSession.candidate.id,
          },
          data: {
            expected_salary: expectedSalary,
          },
        });
        if (!updateCandidateExpectedSalary)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying update candidate expected salary',
          };
      } else {
        console.info('candidate experienced...');
        const { expectedSalary, ...restOfExperiences } =
          submittedValues2.experience; // type error for expectedSalary
        console.info('updating candidate expected salary as experienced...');
        const updateCandidateExpectedSalary = await tx.candidates.update({
          where: {
            id: regSession.candidate.id,
          },
          data: {
            expected_salary: expectedSalary,
          },
        });
        if (!updateCandidateExpectedSalary)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying update candidate expected salary',
          };
        console.info('transforming experiences into array of objects...');
        const arrayOfExperiences = transformToArrayOfObject(restOfExperiences);
        const transformedExperiences = arrayOfExperiences.map((value) => {
          return {
            candidateId: regSession.candidate.id,
            job_title: value.jobTitle,
            job_function: value.jobFunction,
            line_industry: value.lineIndustry,
            job_level: value.positionLevel,
            company_name: value.compName,
            job_description: value.jobDesc ?? '',
            salary: value.currentSalary,
            start_at: new Date(value.startYear),
            end_at: new Date(value.endYear),
            // current checkbox doesn appear
            is_currently: false,
          };
        });
        console.info('storing experiences...');
        const storeExperiences = await tx.working_experiences.createMany({
          data: transformedExperiences,
        });
        if (!storeExperiences)
          return {
            success: false,
            data: null,
            errors: null,
            message: 'Failed when trying store experiences',
          };
      }
      /* STORE EMERGENCY CONTACT */
      console.info('store emergency contacts...');
      const storeEmergencyContacts = await tx.emergencyContacts.create({
        data: {
          phoneNumber: submittedValues2.others
            ?.emergencyContactPhoneNumber as string,
          name: submittedValues2.others?.emergencyContactName as string,
          relationStatus: submittedValues2.others
            ?.emergencyContactRelation as string,
        },
      });
      if (!storeEmergencyContacts)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store emergency contact',
        };
      /* UPDATE EMERGENCY CONTACT ID */
      console.info('updating candidate emergency contact...');
      console.info('emergency contact ID: ', storeEmergencyContacts);
      const updateCandidateEmergencyContact = await tx.candidates.update({
        where: {
          id: regSession.candidate.id,
        },
        data: {
          emengencyContactId: storeEmergencyContacts.id,
        },
      });
      if (!updateCandidateEmergencyContact)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying update candidate emergency contact',
        };
      /* STORE QUESTIONS */
      console.info('storing candidate additional questions...');
      const storeQuestions = await tx.candidateQuestions.createMany({
        data: [
          {
            candidateId: regSession.candidate.id,
            questionId: 1,
            answer: submittedValues2.others?.noticePeriod ?? '',
            created_at: new Date(Date.now()),
          },
          {
            candidateId: regSession.candidate.id,
            questionId: 2,
            answer: [
              submittedValues2.others?.everWorkedMonth,
              submittedValues2.others?.everWorkedYear,
            ].toString(),
            created_at: new Date(Date.now()),
          },
          {
            candidateId: regSession.candidate.id,
            questionId: 3,
            answer: [
              submittedValues2.others?.diseaseName,
              submittedValues2.others?.diseaseYear,
            ].toString(),
            created_at: new Date(Date.now()),
          },
          {
            candidateId: regSession.candidate.id,
            questionId: 4,
            answer: [
              submittedValues2.others?.relationName,
              submittedValues2.others?.relationPosition,
            ].toString(),
            created_at: new Date(Date.now()),
          },
        ],
      });
      if (!storeQuestions)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store questions',
        };
      /* Store Curriculum Vitae */
      console.info('storing curriculum vitae...');
      const storeCurriculumVitae = await tx.documents.create({
        data: {
          saved_name: uuidV4(),
          original_name: documents[1].original_name,
          byte_size: documents[1].byte_size,
          path: 'no-path',
          file_base: Buffer.from(documents[1].file_base),
          created_at: new Date(Date.now()),
          updated_at: new Date(Date.now()),
          documentTypeId: 1, // THE ID OF THE DOCUMENT TYPE
          candidate_id: regSession.candidate.id,
        },
      });
      if (!storeCurriculumVitae)
        return {
          success: false,
          data: null,
          errors: null,
          message: 'Failed when trying store Curriculum Vitae',
        };

      /* Returned Transactions */
      console.info('register phase 2 successfully');
      return {
        success: true,
        data: null,
        errors: null,
        message: 'Register phase 2 successfully',
      };
    },
    {
      timeout: 120000,
    },
  );
  console.info('closing database connection...');
  /* Close prisma.connection */
  await prisma.$disconnect();
  console.info('setting up auth session...');
  /* Set Auth-Session */
  await setUserSession('auth', {
    user: {
      id: regSession.user.id,
    },
    candidate: {
      id: regSession.candidate.id,
    },
  });
  console.info('deleting register session...');
  /* Delete register session */
  await deleteSession('reg');

  console.log('do register results:', doRegisterPhase2);
  console.info('finish');
  /* Returned Value */
  return doRegisterPhase2;
}

/**
 * @description Use Try-Catch to maximize handling storing data errors.
 * @param formData Object that contains fields of user's table.
 * @returns {object} Property "success" always true if operation was successful. Property "data" contains object of user-session value.
 */
export async function createUser(formData: any, phoneNumber: any) {
  /* bycrypt hash with 10 salt-round */
  const hash = await bcrypt.hash(formData.password, 10);
  /* storing user-data */
  const checkEmail = await prisma.users.findUnique({
    where: {
      email: formData.email,
    },
  });
  console.log('is email exist: ', checkEmail);
  if (checkEmail !== null) {
    return {
      success: false,
      message: {
        saveUser: ['Email already exists, please use another email'],
      },
    };
  }
  const checkPhoneNumber = await prisma.candidates.findUnique({
    where: {
      phone_number: phoneNumber,
    },
  });
  console.log('is number exist: ', checkPhoneNumber);
  if (checkPhoneNumber !== null) {
    return {
      success: false,
      message: {
        saveUser: ['Phone number already exists, please use another number'],
      },
    };
  }
  const user = await prisma.users.create({
    data: {
      name: formData.fullname,
      email: formData.email,
      password: hash,
    },
  });

  console.info('the result after submitting...', user);

  if (!user) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create user'],
      },
    };
  }

  console.info('create user successfully', user);
  /* create register-payload */
  const registerPayloadSession = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  /* set-register session */
  await setUserSession('reg', registerPayloadSession, undefined);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: {
      user: registerPayloadSession.user,
    },
  };
}

/**
 * @description Use Try-Catch to maximize handling storing data errors.
 * @param formData Object that contains fields of user's table.
 * @returns {object} Property "success" always true if operation was successful. Property "data" contains object of user-session value.
 */
export async function createCandidate(formData: any) {
  /* Get user-session data */
  const regSession = await getUserSession('reg');
  console.info('reg user-session', regSession);
  /* storing candidate-data */
  const candidate = await prisma.candidates.create({
    data: {
      userId: regSession.user.id,
      phone_number: formData.phoneNumber,
      date_of_birth: new Date(formData.dateOfBirth),
    },
  });

  console.info('the result after submitting...', candidate);

  if (!candidate) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create candidate'],
      },
    };
  }

  console.info('create candidate successfully', candidate);
  /* create register-payload */
  const registerPayloadSession = {
    user: regSession.user,
    candidate: {
      id: candidate.id,
      phone_number: candidate.phone_number,
      date_of_birth: candidate.date_of_birth,
    },
  };

  /* set register-session */
  await setUserSession('reg', registerPayloadSession, undefined);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: registerPayloadSession,
  };
}

export async function storeProfilePhoto(manipulatedPhotoFile: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data');
  /* Create additional document-property */
  const document = await prisma.documents.create({
    data: {
      saved_name: uuidV4(),
      original_name: manipulatedPhotoFile.original_name,
      byte_size: manipulatedPhotoFile.byte_size,
      path: 'no-path',
      file_base: Buffer.from(manipulatedPhotoFile.file_base),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      documentTypeId: 1, // THE ID OF THE DOCUMENT TYPE
      candidate_id: regSession.candidate.id,
    },
  });
  console.info('Result after storing document...', document);
  if (!document) {
    return {
      success: false,
      message: 'Failed to store photo profile, try-again!',
    };
  }
  console.info('Store profile photo successfully', document);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: 'Success to store photo profile',
  };
}

/**
 *
 * @param formData State of candidate input-data profile
 * @returns Object contains "success" and "message" properties if fails and return "success" and "data" properties is susccess.
 */
export async function updateCandidate(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Guard place of birth */
  const birthCity = Array.isArray(formData.placeOfBirth)
    ? formData.placeOfBirth[0]
    : formData.placeOfBirth;
  /* Updating candidate data */
  const candidate = await prisma.candidates.update({
    where: {
      id: regSession.candidate.id,
    },
    data: {
      blood_type: formData.bloodType,
      ethnicity: formData.ethnicity,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      // Domicile //
      /* Guard Birth City */
      birthCity: birthCity.toUpperCase(),
      religion: formData.religion,
    },
  });
  console.info('Result after updating candidate data...', candidate);
  if (!candidate) {
    return {
      success: false,
      message: 'Failed to update candidate data, try again',
    };
  }
  console.info('Update candidate data successfully', candidate);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: candidate,
  };
}

/**
 *
 * @param formData State of candidate input-data Address
 * @param isCurrent Is the condition when the candidate current address same as the primary address.
 */
export async function storingAddress(formData: any, isCurrent: boolean) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * New Address Schema
   * id, street, country, city, zipCode, RT, RW, Subdistrict, Village, isCurrent, candidate-ID
   */
  /* Storing address */
  console.info('Begin store address data...');
  console.info('Checking the current address...');
  console.info('Is Current Address?...', isCurrent);
  if (isCurrent) {
    console.info(
      'Candidate has the same current address as the primary address...',
    );
    /* Store 2 address data, one of them "isCurrent" property "true" */
    const currentAddress = await prisma.addresses.create({
      data: {
        candidateId: regSession.candidate.id,
        street: formData.permanentAddress,
        country: formData.country,
        city: formData.city[0],
        zipCode: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        isCurrent: 'true',
        currentAddress: formData.currentAddress,
        createdAt: new Date(Date.now()),
      },
    });
    console.info('Result after storing address...', currentAddress);
    /* Guard check */
    if (!currentAddress) {
      return {
        success: false,
        message: 'Failed to storing address, try again',
      };
    }
    console.info('Storing address data successfully', currentAddress);

    /* Close connection */
    await prisma.$disconnect();

    return {
      success: true,
      data: currentAddress,
    };
  }
  console.info(
    'Candidate current address is different from the primary address...',
  );
  /**
   * Store address data here
   */
  const address = await prisma.addresses.createMany({
    data: [
      {
        candidateId: regSession.candidate.id,
        street: formData.permanentAddress,
        country: formData.country,
        city: formData.city[0],
        zipCode: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        isCurrent: 'false',
        createdAt: new Date(Date.now()),
      },
      {
        candidateId: regSession.candidate.id,
        street: formData.currentAddress,
        country: formData.country,
        city: formData.city[0],
        zipCode: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        isCurrent: 'true',
        currentAddress: formData.currentAddress,
        createdAt: new Date(Date.now()),
      },
    ],
  });
  console.info('Resuult after storing address data...', address);
  /* Guard check */
  if (!address) {
    return {
      success: false,
      message: 'Failed to storing address-data, try again',
    };
  }
  console.info('Storing address data successfully...', address);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: address,
  };
}

/**
 *
 * @param formData State of candidate input-data Familys
 */
export async function storeFamilys(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * New Familys Schema
   * id, name, gender, dateOfBirth, relationStatus, candidate-ID
   */
  /* Checking familys data length */
  console.info('Begin to store familys data...');
  const familyList = transformToArrayOfObject(formData);
  console.info('Transformed family list', familyList);
  /**
   * Transform nested object to array of object
   * transformToArrayOfObject(formData.families)
   */
  let manipulatedFamily: any[] = [];
  familyList.forEach((value: any) => {
    const familys = {
      candidateId: regSession.candidate.id,
      name: value.name,
      /* UBAH GENDER ID JADI GENDER NCARCHAR */
      gender: value.gender, // change from gender_id to gender
      dateOfBirth: value.dateOfBirth,
      relationStatus: value.relation,
      createdAt: new Date(Date.now()),
    };
    /* Store to defined empty array */
    if (familys.name === undefined) {
      return;
    } else {
      manipulatedFamily.push(familys);
    }
  });
  /**
   * Store multiple records using prisma.
   * await prisma.createMany()
   */
  const familys = await prisma.families.createMany({
    data: manipulatedFamily,
  });
  console.info('Result after storing familys data...', familys);
  /* Guard check */
  if (!familys) {
    return {
      success: false,
      message: 'Failed to store family-data, try again',
    };
  }
  console.info('Storing familys data successfully...', familys);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: familys,
  };
}

/**
 *
 * @param formData State of candidate input-data Education
 * @summary Done Fixed
 */
export async function storeEducation(
  formData: any,
  startyear: number,
  endYear: number,
  isFormal: boolean | undefined,
) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data');
  console.info('is formal education: ', isFormal);
  /* Storing Education */
  if (isFormal === true) {
    console.info('Begin storing education data...');
    const education = await prisma.educations.create({
      data: {
        candidateId: regSession.candidate.id,
        level: formData.educationLevel.toString(),
        major: formData.educationMajor[0].toUpperCase(),
        start_year: startyear,
        end_year: endYear,
        university_name: formData.schoolName[0],
        cityOfSchool: formData.cityOfSchool[0].toUpperCase(),
        gpa: formData.gpa,
        is_latest: false,
        is_graduate: false,
        created_at: new Date(Date.now()),
      },
    });
    console.info('Result after storing education data...', education);
    /* Guard check */
    if (!education) {
      return {
        success: false,
        message: 'Failed to store education-data',
      };
    }
    console.info('Storing education data successfully...', education);

    /* Close connection */
    await prisma.$disconnect();

    return {
      success: true,
      data: education,
    };
  }

  return {
    success: true,
    data: 'Formal checkbox unchecked, no-store education',
  };
}

/**
 *
 * @param formData State of candidate input-data certifications
 * @returns
 * @summary Done Fixed
 */
export async function storeCertification(
  formData: any,
  month: number,
  year: number,
  isCertificates: string | undefined,
) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Storing  certification */
  console.info('Begin to maipulating certification data...');
  if (isCertificates === 'on') {
    /**
     * New Certificates Schema
     * id, name, institution, issuedData, candidate-ID
     */
    /* Transform to array of object */
    const certificationList = transformToArrayOfObject(formData);
    // console.info('transformed certification: ', certificationList);
    /* CHECK HERE */
    console.info('List of certification:', certificationList);
    let manipulatedCertifications: any[] = [];
    certificationList.forEach((value) => {
      console.info('value inside looping', value);
      const certification = {
        candidateId: regSession.candidate.id,
        certificateId: Number(value.certificationName[0]),
        institutionName: value.institution,
        // certification issued date terbalik
        issuedDate: new Date(year, month),
        created_at: new Date(Date.now()),
      };
      /* Store to defined empty array */
      manipulatedCertifications.push(certification);
    });
    console.info('Manipulated certifications...', manipulatedCertifications);
    console.info('Begin to storing certification data...');
    /* Store certifications here */
    const certifications = await prisma.certifications.createMany({
      data: manipulatedCertifications,
    });
    console.info('Result after store certifications...', certifications);
    if (!certifications) {
      return {
        success: false,
        message: 'Failed to store certification data, try again',
      };
    }
    console.info('Storing certifications successfully...', certifications);

    /* Close connection */
    await prisma.$disconnect();

    return {
      success: true,
      data: certifications,
    };
  }
  return {
    success: true,
    data: 'Certificates checkbox unchecked',
  };
}

/**
 *
 * @param formData State of candidate input-data skills.
 * @summary Done Fixed
 */
export async function storeSkills(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * Store to candidate-skills table.
   *
   */
  console.log('Begin manipulating skills data...');
  let manipulatedSkills: any[] = [];
  const skillList: any[] = formData;
  skillList.forEach((value) => {
    const skill = {
      candidateId: regSession.candidate.id,
      skillId: value,
    };
    /* Store manipulated data to empty array */
    manipulatedSkills.push(skill);
  });
  console.info('Manipulated skills data...', manipulatedSkills);
  console.info('Begin store skills data...');
  const skills = await prisma.candidateSkills.createMany({
    data: manipulatedSkills,
  });
  /* Guard check */
  if (!skills) {
    return {
      success: false,
      message: 'Failed to store skills data, try again',
    };
  }
  console.info('Result after storing skills data...', skills);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: skills,
  };
}

/**
 *
 * @param formData State of candidate input-data language
 * @returns
 */
export async function storeLanguage(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store Language data */
  console.info('Begin manipulating language data...');
  const languageList = transformToArrayOfObject(formData);
  let manipulatedLanguage: any[] = [];
  languageList.forEach((value) => {
    const language = {
      candidateId: regSession.candidate.id,
      name: value.name,
      level: value.level,
      createdAt: new Date(Date.now()),
    };
    /* Store value to defined empty array */
    manipulatedLanguage.push(language);
  });
  console.info('Manipulated language data...', manipulatedLanguage);
  console.info('Begin to store Language data...');
  /**
   * Store language using prisma
   * Guard check
   * return the value
   */
  const language = await prisma.languages.createMany({
    data: manipulatedLanguage,
  });
  console.info('Result after storing language data...', language);
  /* Guard check */
  if (!language) {
    return {
      success: false,
      message: 'Failed to store skills data, try again',
    };
  }
  console.info('Storing language data successfully...', language);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: language,
  };
}

export async function storeExperiences(formData: any, isExperienced: string) {
  /* Getting reg-session data */
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  if (isExperienced === 'Professional') {
    /* Begin to store Experience data */
    const experienceList: any[] = transformToArrayOfObject(formData);
    console.info('LENGTH', experienceList.length);
    let manipulatedExperienceList: any[] = [];
    experienceList.forEach((value) => {
      const experience = {
        candidateId: regSession.candidate.id,
        job_title: value.jobTitle,
        job_function: value.jobFunction,
        line_industry: value.lineIndustry,
        job_level: value.positionLevel,
        company_name: value.compName,
        job_description: value.jobDesc ?? '',
        salary: value.currentSalary,
        start_at: value.startYear,
        end_at: value.endYear,
        is_currently: value.currentYear === 'on' ? true : false,
        created_at: new Date(Date.now()),
      };
      if (experience.job_title === undefined) {
        return;
      } else {
        manipulatedExperienceList.push(experience);
      }
    });
    console.info(
      'manipulated experience list result',
      manipulatedExperienceList,
    );
    console.info('Begin to store Experience data...');
    const experience = await prisma.working_experiences.createMany({
      data: manipulatedExperienceList,
    });
    console.info('Result after storing experience...', experience);
    /* Guard check */
    if (!experience) {
      return {
        success: false,
        message: 'Failed to store experience, try again',
      };
    }
    console.info('Storing experience data successfully...', experience);
    /* Updating expected-salary data */
    console.info('Begin updating expected-salary data...');
    const candidate = await prisma.candidates.update({
      where: {
        id: regSession.candidate.id,
      },
      data: {
        expected_salary: Number(formData.expectedSalary),
      },
    });
    console.info('Result after updating expected-salary data...', candidate);
    /* Guard check */
    if (!candidate) {
      return {
        success: false,
        message: 'Failed to update expected-salary data, try again',
      };
    }
    console.info('Updating expected-salary data successfully...', candidate);

    /* Close connection */
    await prisma.$disconnect();

    return {
      success: true,
      data: experience,
    };
  } else if (isExperienced === 'Fresh Graduate') {
    console.info('Begin updating expected-salary data...');
    const candidate = await prisma.candidates.update({
      where: {
        id: regSession.candidate.id,
      },
      data: {
        expected_salary: Number(formData.expectedSalary),
      },
    });
    /* Guard check */
    if (!candidate) {
      return {
        success: false,
        message: 'Failed to update expected-salary data, try again',
      };
    }
    console.info('Updating expected-salary data successfully...', candidate);

    /* Close connection */
    await prisma.$disconnect();

    return {
      success: true,
      data: candidate,
    };
  }
  return {
    success: true,
    message: 'No operation performed!',
  };
}

export async function storeEmergencyContact(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store Emergency contact-data */
  console.info('Begin to store emergency contact...');
  const emergencyContact = await prisma.emergencyContacts.create({
    data: {
      phoneNumber: formData.emergencyContactPhoneNumber,
      name: formData.emergencyContactName,
      relationStatus: formData.emergencyContactRelation,
    },
  });
  console.info('Result after store emergency contact...', emergencyContact);
  if (!emergencyContact) {
    return {
      success: false,
      message: 'Failed to store emergency contact',
    };
  }
  console.info('Storing emergency contact successfully', emergencyContact);
  /* Update emergencyContactID for candidate */
  console.info('Begin to updating candidate emergency conatact ID...');
  const updateCandidate = await prisma.candidates.update({
    where: {
      id: regSession.candidate.id,
    },
    data: {
      emengencyContactId: emergencyContact.id,
    },
  });
  console.info(
    'Result after updating candidate emergency contact ID...',
    updateCandidate,
  );
  if (!updateCandidate) {
    return {
      success: false,
      message: 'Failed to updating candidate emergency contact ID...',
    };
  }
  /* Updating emergency contact-ID */

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: emergencyContact,
  };
}

/**
 *
 * @param formData State of candidate input-data question answer.
 */
export async function storeCandidateQuestions(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store candidate-questions data */
  console.info('Begin to store candidate-questions data...');
  const candidateQuestions = await prisma.candidateQuestions.createMany({
    data: [
      {
        candidateId: regSession.candidate.id,
        questionId: 1,
        answer: formData.noticePeriod,
        created_at: new Date(Date.now()),
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 2,
        answer: [formData.everWorkedMonth, formData.everWorkedYear].toString(),
        created_at: new Date(Date.now()),
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 3,
        answer: [formData.diseaseName, formData.diseaseYear].toString(),
        created_at: new Date(Date.now()),
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 4,
        answer: [formData.relationName, formData.relationPosition].toString(),
        created_at: new Date(Date.now()),
      },
    ],
  });
  console.info(
    'Result after storing candidate-question data...',
    candidateQuestions,
  );
  /* Guard check */
  if (!candidateQuestions) {
    return {
      success: false,
      message: 'Failed to store candidate-question data, try again',
    };
  }
  console.info('Storing candidate-question data...', candidateQuestions);

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: candidateQuestions,
  };
}

export async function storeCurriculumVitae(manipulatedCurriculumVitae: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Create additional document-property */
  console.info('Begin to store curriculum vitae documen...');
  const document = await prisma.documents.create({
    data: {
      saved_name: uuidV4(),
      original_name: manipulatedCurriculumVitae.original_name,
      byte_size: manipulatedCurriculumVitae.byte_size,
      path: 'no-path',
      file_base: Buffer.from(manipulatedCurriculumVitae.file_base),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      documentTypeId: 2,
      candidate_id: regSession.candidate.id,
    },
  });
  console.info('Result after storing curriculum vitae document...', document);
  /* Guard check */
  if (!document) {
    return {
      success: false,
      message: 'Failed to store curriculum-vitae document, try again',
    };
  }
  console.info('Store curriculum-vitae document successfully...', document);

  /* Close connection */
  await prisma.$disconnect();

  /* set auth-session */
  await setUserSession('auth', {
    user: { id: regSession.user.id },
    candidate: { id: regSession.candidate.id },
  });

  /* delete reg-session */
  await deleteSession('reg');

  return {
    success: true,
    data: 'Success store CV',
  };
}

export async function updateVerifiedUserEmail(email: string) {
  console.info('Begin updating user email verification status...');
  const updateUser = await prisma.users.update({
    where: {
      email: email,
    },
    data: {
      is_email_verified: true,
    },
  });
  console.info(
    'Result after updating user email verification status...',
    updateUser,
  );
  /* Guard check */
  if (!updateUser) {
    return {
      success: false,
      message: 'Failed to update user email verification status!',
    };
  }
  console.info(
    'Update user email verification status successfully...',
    updateUser,
  );

  /* Close connection */
  await prisma.$disconnect();

  return {
    success: true,
    data: updateUser,
  };
}

export async function checkEmailVerifiedStatus(): Promise<boolean> {
  console.info('Getting user reg-session data...');
  const regSession = await getUserSession('reg');
  console.info('reg-session -> ', regSession);
  const userEmailVerifiedStatus = await prisma.users.findUnique({
    where: {
      email: regSession.user.email,
    },
  });
  console.info('user-data -> ', userEmailVerifiedStatus);
  if (!userEmailVerifiedStatus?.is_email_verified) {
    console.info('Email is not verified...');
    return false;
  }
  console.info('Email is verified...');
  return true;
}
/* NOT USED */
