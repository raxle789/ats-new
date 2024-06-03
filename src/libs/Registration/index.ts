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
import { cookies } from 'next/headers';
import { linkedinSession } from '../Sessions/utils';

/**
 * Trial Test
 */
export interface TypeSubmittedValues1 extends FieldType {
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
  const { expectedSalary, ...restOfExperiences } = submittedValues1.experience; // give this type of experiences.
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
};

/* ============================================================================== */
export interface TypeReturnedServerAction {
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
    dateOfBirth: new Date(submittedValues1.dateOfBirth ? submittedValues1.dateOfBirth.toString() : Date.now()),
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
  try {
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
            roles: [] // empty roles if user only register on a phase 1
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
    const hasLinkedInSession = cookies().has(linkedinSession);
    /**
     * If linkedin session exist, then delete it
     */
    if(hasLinkedInSession) await deleteSession('linkedin');
    /* Return the transaction value */
    return doRegisterPhase1;
  } catch (error) {
    console.info(error);
    return {
      success: false,
      data: null,
      errors: null,
      message: 'Database connection issue, please try again later'
    };
  };
};

export async function RegisterPhase2(submittedValues2: TypeSubmittedValues2, documents: TypeTransformedDocument[]) {
  /* Validate Final Registration */
  const { expectedSalary, ...restOfExperiences } = submittedValues2.experience ?? { expectedSalary: undefined };
  const transformedSubmittedValues2 = {
    ...submittedValues2,
    families: transformToArrayOfObject(submittedValues2.families).filter(family => family.relation !== undefined),
    certification: transformToArrayOfObject(submittedValues2.certification).filter(cert => cert.institution !== undefined),
    language: transformToArrayOfObject(submittedValues2.language).filter(lang => lang.name  !== undefined),
    expectedSalary: expectedSalary,
    experience: transformToArrayOfObject(restOfExperiences).filter(experience => experience.jobTitle !== undefined) // current experience should be included
  };
  console.info('TRANSFORMED SUBMIT VALUES2:', transformedSubmittedValues2);
  const validateInput = REGISTER_2.safeParse(transformedSubmittedValues2);
  if(!validateInput.success) {
    const zodErrorsObject = validateInput.error.flatten().fieldErrors; // use this format on an object
    const zodErrorsNestedObject = validateInput.error.format();
    return {
      success: false,
      data: null,
      errors: zodErrorsNestedObject,
      message: 'Please fill all the required data'
    };
  };
  console.log('validated data: ', validateInput.data);
  const validatedInputData = validateInput.data;
  /* end of validation */
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  console.info('begin transaction register phase 2...');
  try {
    const doRegisterPhase2 = await prisma.$transaction(async (tx) => {
      console.info('storing documents...');
      await tx.documents.createMany({
        data: [
          {
            saved_name: uuidV4(),
            original_name: documents[0].original_name,
            byte_size: documents[0].byte_size,
            path: 'no-path',
            file_base: Buffer.from(documents[0].file_base),
            created_at: new Date(Date.now()),
            documentTypeId: 1,
            candidate_id: regSession.candidate.id
          },
          {
            saved_name: uuidV4(),
            original_name: documents[1].original_name,
            byte_size: documents[1].byte_size,
            path: 'no-path',
            file_base: Buffer.from(documents[1].file_base),
            created_at: new Date(Date.now()),
            documentTypeId: 2,
            candidate_id: regSession.candidate.id
          }
        ]
      });
      console.info('updating user...');
      await tx.users.update({
        where: {
          id: regSession.user.id
        },
        data: {
          name: validatedInputData.profile.fullname,
          email: validatedInputData.profile.email,
          updated_at: new Date(Date.now())
        }
      });
      console.info('assigning role...');
      await tx.userRoles.create({
        data: {
          roleId: 3,
          userId: regSession.user.id
        }
      });
      console.info('updating candidate...');
      await tx.candidates.update({
        where: {
          id: regSession.candidate.id
        },
        data: {
          phone_number: validatedInputData.profile.phoneNumber,
          date_of_birth: validatedInputData.profile.dateOfBirth,
          birthCity: validatedInputData.profile.placeOfBirth.toString(),
          gender: validatedInputData.profile.gender,
          religion: validatedInputData.profile.religion,
          ethnicity: validatedInputData.profile.ethnicity,
          blood_type: validatedInputData.profile.bloodType,
          maritalStatus: validatedInputData.profile.maritalStatus
        }
      });
      console.info('storing address...');
      await tx.addresses.create({
        data: {
          id_of_candidate: regSession.candidate.id,
          street: validatedInputData.address.permanentAddress,
          country: validatedInputData.address.country,
          city: validatedInputData.address.city.toString(),
          zipCode: validatedInputData.address.zipCode,
          subdistrict: validatedInputData.address.subdistrict,
          village: validatedInputData.address.village,
          rt: validatedInputData.address.rt,
          rw: validatedInputData.address.rw,
          createdAt: new Date(Date.now()),
          currentAddress: validatedInputData.address.currentAddress === '' ? null : validatedInputData.address.currentAddress,
        }
      });
      if(validatedInputData.families.length > 0) {
        console.info('storing families...');
        /* transform to array of object ready to store */
        const familiesReadyToStore = validatedInputData.families.map(family => {
          return {
            id_of_candidate: regSession.candidate.id,
            name: family.name,
            relation: family.relation,
            gender: family.gender,
            dateOfBirth: family.dateOfBirth,
            createdAt: new Date(Date.now())
          }
        });
        await tx.families.createMany({
          data: familiesReadyToStore
        });
      } else {
        console.info('haven\'t families...');
      };

      console.info('storing education...');
      await tx.educations.create({
        data: {
          id_of_candidate: regSession.candidate.id,
          university_name: validatedInputData.education.schoolName.toString(),
          edu_level: validatedInputData.education.educationLevel,
          edu_major: validatedInputData.education.educationMajor.toString(),
          gpa: validatedInputData.education.gpa,
          city: validatedInputData.education.cityOfSchool.toString(),
          start_year: new Date(validatedInputData.education.startEduYear),
          end_year: new Date(validatedInputData.education.endEduYear),
          status: 'graduated', // compare end year and todays year
          created_at: new Date(Date.now())
        }
      });

      if(validatedInputData.certification.length > 0) {
        console.info('storing certificate...');
        /* transform to array of object ready to store */
        const certificationsTransformFunction = async () => {
          const certificationsData = validatedInputData.certification.map(async certification => {
            if(!Number(certification.certificationName.toString())) {
              const storeCertificate = await tx.certificates.create({
                data: {
                  name: certification.certificationName,
                  createdAt: new Date(Date.now())
                }
              });

              /* Return object with the new stored certificate */
              return {
                id_of_candidate: regSession.candidate.id,
                id_of_certificate: storeCertificate.id,
                institutionName: certification.institution,
                issuedDate: certification.monthIssue,
                created_at: new Date(Date.now())
              }
            };

            /* Return if the value already number */
            return {
              id_of_candidate: regSession.candidate.id,
              id_of_certificate: Number(certification.certificationName.toString()), // it's should be a number
              institutionName: certification.institution,
              issuedDate: certification.monthIssue,
              created_at: new Date(Date.now())
            };
          });

          const results = await Promise.all(certificationsData);
          return results;
        };

        const certificationsReadyToStore = await certificationsTransformFunction();
        await tx.certifications.createMany({
          data: certificationsReadyToStore
        });
      } else {
        console.info('candidate haven\'t certifications...');
      };

      if(validatedInputData.skills.length > 0) {
        console.info('storing skills...');
        const skillsTrasformFunction = async () => {
          const skillsData  = validatedInputData.skills.map(async skill => {
            if(!Number(skill)) {
              const storeSkill = await tx.skills.create({
                data: {
                  name: skill,
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                }
              });

              /* Return object with the new stored skill */
              return {
                id_of_candidate: regSession.candidate.id,
                id_of_skill: storeSkill.id
              };
            };

            /* Return if value already number */
            return {
              id_of_candidate: regSession.candidate.id,
              id_of_skill: skill
            };
          });

          const results = await Promise.all(skillsData);
          return results;
        };

        const candidateSkillsReadyToStore = await skillsTrasformFunction();
        await tx.candidateSkills.createMany({
          data: candidateSkillsReadyToStore
        });

      } else {
        console.info('candidate haven\'t skills...');
      };

      console.info('storing languages...');
      const languagesReadyToStore = validatedInputData.language.map(lang => {
        return {
          id_of_candidate: regSession.candidate.id,
          name: lang.name,
          proficiency: lang.level,
          createdAt: new Date(Date.now())
        };
      });
      await tx.languages.createMany({
        data: languagesReadyToStore
      });

      console.info('updating expected salary...');
      await tx.candidates.update({
        where: {
          id: regSession.candidate.id
        },
        data: {
          expected_salary: validatedInputData.expectedSalary
        }
      });

      if(validatedInputData.experience.length > 0) {
        console.info('storing experiences...');
        const experiencesReadyToStore = validatedInputData.experience.map(experience => {
          return {
            id_of_candidate: regSession.candidate.id,
            company_name: experience.compName,
            line_industry: experience.lineIndustry,
            job_title: experience.jobTitle,
            job_level: experience.positionLevel,
            job_function: experience.jobFunction,
            job_description: experience.jobDesc,
            salary: experience.currentSalary,
            start_at: experience.startYear,
            end_at: experience.endYear, // NULLABLE - If current checked, it shoudl be null.
            // is_currently: false,
            status: '-', // status can be determined by checked current or not. NULLABLE
            created_at: new Date(Date.now())
          }
        });
        await tx.working_experiences.createMany({
          data: experiencesReadyToStore
        });
      } else {
        console.info('candidate haven\'t experiences...');
      };

      if(validatedInputData.others.emergencyContactName !== '' &&
      validatedInputData.others.emergencyContactRelation !== '' &&
      validatedInputData.others.emergencyContactPhoneNumber !== '') {
        console.info('storing emergency contact...');
        const storeEmergencyContact = await tx.emergencyContacts.create({
          data: {
            name: validatedInputData.others.emergencyContactName,
            relationStatus: validatedInputData.others.emergencyContactRelation,
            phoneNumber: validatedInputData.others.emergencyContactPhoneNumber
          }
        });
        await tx.candidates.update({
          where: {
            id: regSession.candidate.id
          },
          data: {
            emengencyContactId: storeEmergencyContact.id
          }
        });
      } else {
        console.info('candidate haven\'t emergency contact filled...');
      };

      console.info('storing notice period question...');
      await tx.candidateQuestions.create({
        data: {
          candidateId: regSession.candidate.id,
          questionId: 1,
          answer: validatedInputData.others.noticePeriod
        }
      });

      if(validatedInputData.everWorkedOption === 'Yes') {
        console.info('storing ever worked with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 2,
            answer: [validatedInputData.others.everWorkedMonth, validatedInputData.others.everWorkedYear].toString()
          }
        });
      } else {
        console.info('storing ever worked with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 2,
            answer: 'no'
          }
        });
      };

      if(validatedInputData.diseaseOption === 'Yes') {
        console.info('storing disease with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 3,
            answer: [validatedInputData.others.diseaseName, validatedInputData.others.diseaseYear].toString()
          }
        });
      } else {
        console.info('storing disease with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 3,
            answer: 'no'
          }
        });
      };

      if(validatedInputData.relationOption === 'Yes') {
        console.info('storing rerlation with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 4,
            answer: [validatedInputData.others.relationName, validatedInputData.others.relationPosition].toString()
          }
        });
      } else {
        console.info('storing relation with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: regSession.candidate.id,
            questionId: 4,
            answer: 'no'
          }
        });
      };

      console.info('getting roles...');
      const roles = await tx.userRoles.findMany({
        where: {
          userId: regSession.user.id,
        },
        select: {
          roles: {
            select: {
              name: true
            },
          },
        },
      });
      console.info("roles \t:", roles);
      const listOfRoles = roles.map(role => role.roles.name);

      /* Final transaction return */
      return {
        success: true,
        data: listOfRoles,
        errors: null,
        message: 'Register phase 2 successfully'
      }
    }, {
      timeout: 10000
    });
    console.info('closing database connection...');
    /* Close prisma.connection */
    await prisma.$disconnect();
    console.info('setting up auth session...');
    /* Set Auth-Session */
    await setUserSession('auth', {
      user: {
        id: regSession.user.id
      },
      candidate: {
        id: regSession.candidate.id
      },
      roles: doRegisterPhase2.data
    });
    console.info('deleting register session...');
    /* Delete register session */
    await deleteSession('reg');

    console.info('finish');
    /* Returned Value */
    return doRegisterPhase2;
  } catch (error) {
    console.info(error);
    console.info('closing database connection...');
    /* Close prisma.connection */
    await prisma.$disconnect();
    console.info('database operatio errors...');

    if(error) {
      return {
        success: false,
        data: null,
        error: 'unknown error  on database operation',
        message: 'There is a problem with our database operation, please try again later'
      };
    };
  };
  return {
    success: false,
    data: null,
    error: 'unknown error on system logic',
    message: 'There is a problem with the system, please try again later'
  };
};

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
