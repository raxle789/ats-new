'use server';

import prisma from "@/root/prisma";
import { getUserSession } from "../Sessions";
import { TypeReturnedServerAction } from "../Registration";

export async function updateCandidateProfile(submittedValue: any): Promise<TypeReturnedServerAction> {
  console.info('Submitted Value Data \t:', submittedValue);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  try {
    const updateProfile = await prisma.$transaction(async (tx) => {
      console.info("is user update profile photo?...")
      if(submittedValue.profilePicture) {
        console.info("updating profile picture...");
        await tx.documents.updateMany({
          where: {
            candidate_id: authSession.candidate.id,
            documentTypeId: 1 // specify document type
          },
          data: {
            original_name: submittedValue.profilePicture.original_name,
            byte_size: submittedValue.profilePicture.byte_size,
            file_base: Buffer.from(submittedValue.profilePicture.file_base),
            updated_at: new Date(Date.now()),
          }
        });
      };
      console.info('updating user data...');
      await tx.users.update({
        where: {
          id: authSession.user.id
        },
        data: {
          name: submittedValue.profile.fullname,
          email: submittedValue.profile.email,
          updated_at: new Date(Date.now()),
        }
      });
      console.info('updating candidate data...');
      await tx.candidates.update({
        where: {
          id: authSession.candidate.id
        },
        data: {
          blood_type: submittedValue.profile.bloodType,
          date_of_birth: new Date(`${submittedValue.profile.dateOfBirth}`),
          ethnicity: submittedValue.profile.ethnicity,
          gender: submittedValue.profile.gender,
          maritalStatus: submittedValue.profile.maritalStatus,
          phone_number: submittedValue.profile.phoneNumber,
          birthCity: submittedValue.profile.placeOfBirth,
          religion: submittedValue.profile.religion
        }
      });
      console.info('updating address data...');
      await tx.addresses.updateMany({
        where: {
          id_of_candidate: authSession.candidate.id
        },
        data: {
          city: submittedValue.address.city,
          country: submittedValue.address.country,
          currentAddress: submittedValue.address.currentAddress ?? '',
          street: submittedValue.address.permanentAddress,
          rt: submittedValue.address.rt,
          rw: submittedValue.address.rw,
          subdistrict: submittedValue.address.subdistrict,
          village: submittedValue.address.village,
          zipCode: submittedValue.address.zipCode
        }
      });
      console.info('finish:')
      return {
        success: true,
        data: null,
        errors: null,
        message: "Data updated successfully:"
      };
    }, {
      timeout: 30000
    });
    return updateProfile;
  } catch (error) {
    console.info('error updating: ', error);
    return {
      success: false,
      data: null,
      errors: error,
      message: 'Error updating profile'
    };
  }
};

export async function updateCandidateExperiences(submittedValue: any): Promise<TypeReturnedServerAction> {
  console.info('Submitted Value Data \t:', submittedValue);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  const { expectedSalary, ...restOfExperiences } = submittedValue.experience;
  const arrExperiences = Object.values(restOfExperiences).map((experience: any) => {
    return {
      id_of_candidate: authSession.candidate.id,
      company_name: experience.compName,
      line_industry: experience.lineIndustry,
      job_title: experience.jobTitle,
      job_level: experience.positionLevel,
      job_function: experience.jobFunction,
      job_description: experience.jobDesc,
      salary: experience.currentSalary,
      start_at: new Date(experience.startYear),
      end_at: new Date(experience.endYear), // NULLABLE - If current checked, it shoudl be null.
      // is_currently: false,
      status: '-', // status can be determined by checked current or not. NULLABLE
      created_at: new Date(Date.now())
    };
  });
  console.info("Arra Of Experiences \t:", arrExperiences);
  console.info("Expected Salary \t:", expectedSalary);
  try {
    const updateExperiences = await prisma.$transaction(async (tx) => {
      console.info('updating question 1...');
      await tx.candidateQuestions.updateMany({
        where: {
          candidateId: authSession.candidate.id,
          questionId: 1
        },
        data: {
          answer: submittedValue.others.noticePeriod
        }
      });
      console.info('updating expected salary...');
      await tx.candidates.update({
        where: {
          id: authSession.candidate.id,
        },
        data: {
          expected_salary: expectedSalary
        }
      });
      console.info('deleting working experiences...');
      await tx.working_experiences.deleteMany({
        where: {
          id_of_candidate: authSession.candidate.id
        }
      });
      console.info('creating new working experiences...');
      await tx.working_experiences.createMany({
        data: arrExperiences
      });
      console.info('finish:');
      return {
        success: true,
        data: null,
        errors: null,
        message: 'Data updated successfully:'
      };
    });

    return updateExperiences;
  } catch (error) {
    console.info("Error \t:", error);
    return {
      success: false,
      data: null,
      errors: error,
      message: "Error updating experience!"
    };
  };
};

export async function updateEducationSkills(submittedValue: any): Promise<TypeReturnedServerAction> {
  console.info('Submitted Certification Data \t:', submittedValue.certification);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  try {
    const updateEducationSkills = await prisma.$transaction(async (tx) => {
      console.info('updating education...');
      await tx.educations.update({
        where: {
          // id: submittedValue.education.id
          id_of_candidate: authSession.candidate.id
        },
        data: {
          university_name: submittedValue.education.schoolName.toString(),
          edu_level: submittedValue.education.educationLevel,
          edu_major: submittedValue.education.educationMajor.toString(),
          gpa: submittedValue.education.gpa,
          city: submittedValue.education.cityOfSchool.toString(),
          start_year: new Date(submittedValue.education.startEduYear),
          end_year: new Date(submittedValue.education.endEduYear),
          status: 'graduated', // compare end year and todays year
          created_at: new Date(Date.now())
        }
      });
      console.info('deleting certifications...');
      await tx.certifications.deleteMany({
        where: {
          id_of_candidate: authSession.candidate.id
        }
      });
      const certificationsTransformFunction = async () => {
        const certificationsData = Object.values(submittedValue.certification).map(async (certification: any) => {
          if(!Number(certification.certificationName.toString())) {
            const storeCertificate = await tx.certificates.create({
              data: {
                name: certification.certificationName.toString(),
                createdAt: new Date(Date.now())
              }
            });

            /* Return object with the new stored certificate */
            return {
              id_of_candidate: authSession.candidate.id,
              id_of_certificate: storeCertificate.id,
              institutionName: certification.institution,
              issuedDate: certification.monthIssue,
              created_at: new Date(Date.now())
            }
          };

          /* Return if the value already number */
          return {
            id_of_candidate: authSession.candidate.id,
            id_of_certificate: Number(certification.certificationName), // it's should be a number
            // id_of_certificate: Number(certification.certificationName.toString()), // it's should be a number
            institutionName: certification.institution,
            issuedDate: certification.monthIssue,
            created_at: new Date(Date.now())
          };
        });

        const results = await Promise.all(certificationsData);
        return results;
      };

      const certificationsReadyToStore = await certificationsTransformFunction();
      console.info('re-storing certifications...');
      await tx.certifications.createMany({
        data: certificationsReadyToStore
      });

      console.info('deleting skills...');
      await tx.candidateSkills.deleteMany({
        where: {
          id_of_candidate: authSession.candidate.id
        }
      });
      console.info('is candidate deleting all skills?...');
      if(submittedValue.skills.length > 0) {
        console.info('re-storing skills...');
        console.info('storing skills...');
        const skillsTrasformFunction = async () => {
          const skillsData  = submittedValue.skills.map(async (skill: any) => {
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
                id_of_candidate: authSession.candidate.id,
                id_of_skill: storeSkill.id
              };
            };

            /* Return if value already number */
            return {
              id_of_candidate: authSession.candidate.id,
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
      };

      console.info('deleting candidate languages proficiency...');
      await tx.languages.deleteMany({
        where: {
          id_of_candidate: authSession.candidate.id
        }
      });
      console.info('updating candidate languages proficiency...');
      const languagesReadyToStore = Object.values(submittedValue.language).map((lang: any) => {
        return {
          id_of_candidate: authSession.candidate.id,
          name: lang.name,
          proficiency: lang.proficiency,
          createdAt: new Date(Date.now())
        };
      });
      await tx.languages.createMany({
        data: languagesReadyToStore
      });

      return {
        success: true,
        data: null,
        errors: null,
        message: 'Data updated successfully:'
      };
    });

    return updateEducationSkills;
  } catch (error) {
    console.info("Error \t:", error);
    return {
      success: false,
      data: null,
      errors: error,
      message: 'Error updating education and skills!'
    };
  };
};

export async function updateAdditionalInformations(submittedValue: any): Promise<TypeReturnedServerAction> {
  console.info("Submitted SOURCE Values \t:", submittedValue.others.source);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  try {
    const updateAdditionalInformations = await prisma.$transaction(async (tx) => {
      console.info('deleting candidate families...');
      await tx.families.deleteMany({
        where: {
          id_of_candidate: authSession.candidate.id
        }
      });
      console.info('re-storing candidate families...');
      const familiesReadyToStore = Object.values(submittedValue.families).map((family: any) => {
        return {
          id_of_candidate: authSession.candidate.id,
          name: family.name,
          relation: family.relation,
          gender: family.gender,
          dateOfBirth: new Date(family.dateOfBirth),
          createdAt: new Date(Date.now())
        };
      });
      await tx.families.createMany({
        data: familiesReadyToStore
      });

      /**
       * Only update emergency when the value exists
       */
      if(submittedValue.others.emergencyContactId) {
        console.info('updating existing emergency contact...');
        await tx.emergencyContacts.update({
          where: {
            id: submittedValue.others.emergencyContactId
          },
          data: {
            name: submittedValue.others.emergencyContactName,
            phoneNumber: submittedValue.others.emergencyContactPhoneNumber,
            relationStatus: submittedValue.others.emergencyContactRelation
          }
        });
      };

      console.info('updating source ...');
      await tx.candidates.update({
        where: {
          id: authSession.candidate.id
        },
        data: {
          sourceId: Number(submittedValue.others.source)
        }
      });

      /**
       * Update on each questions, and check if option yes or no
       */
      console.info('checking on each questions...');
      if(submittedValue.everWorkedOption === 'Yes') {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 2,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing ever worked with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 2,
            answer: [submittedValue.others.everWorkedMonth, submittedValue.others.everWorkedYear].toString()
          }
        });
      } else {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 2,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing ever worked with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 2,
            answer: 'no'
          }
        });
      };

      if(submittedValue.diseaseOption === 'Yes') {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 3,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing disease with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 3,
            answer: [submittedValue.others.diseaseName, submittedValue.others.diseaseYear].toString()
          }
        });
      } else {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 3,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing disease with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 3,
            answer: 'no'
          }
        });
      };

      if(submittedValue.relationOption === 'Yes') {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 4,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing rerlation with yes...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 4,
            answer: [submittedValue.others.relationName, submittedValue.others.relationPosition].toString()
          }
        });
      } else {
        await tx.candidateQuestions.deleteMany({
          where: {
            questionId: 4,
            candidateId: authSession.candidate.id,
          }
        });
        console.info('storing relation with no...');
        await tx.candidateQuestions.create({
          data: {
            candidateId: authSession.candidate.id,
            questionId: 4,
            answer: 'no'
          }
        });
      };

      return {
        success: true,
        data: null,
        errors: null,
        message: 'Additional Information updated successfully:'
      };
    });
    return updateAdditionalInformations;
  } catch (error) {
    console.info("Error \t:", error);
    return {
      success: false,
      data: null,
      errors: error,
      message: 'Error updating additional information!'
    };
  };
};