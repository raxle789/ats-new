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
  console.info('Submitted Value Data \t:', submittedValue);
  const authSession = await getUserSession('auth');
  console.info('reg-session-data', authSession);
  try {
    const updateEducationSkills = await prisma.$transaction(async (tx) => {
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
                name: certification.certificationName,
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
      await tx.certifications.createMany({
        data: certificationsReadyToStore
      });

      /**
       * Store skill and languages
       */

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