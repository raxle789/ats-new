'use server';

import prisma from "@/root/prisma";
import { getUserSession } from "../Sessions";
import { TypeReturnedServerAction } from "../Registration";
import { v4 as uuidV4 } from 'uuid';

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
    const dateNow = new Date(Date.now());
    const experienceYear = new Date(experience.endYear).getFullYear();
    const experienceMonth = new Date(experience.endYear).getMonth();
    const isPresent = experienceYear >= dateNow.getFullYear() && experienceMonth >= dateNow.getMonth() ? true : false;
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
      status: isPresent ? "present" : '-', // status can be determined by checked current or not. NULLABLE
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
      } else {
        console.info('add a new emergency contact...');
        const emergencyContact = await tx.emergencyContacts.create({
          data: {
            name: submittedValue.others.emergencyContactName,
            phoneNumber: submittedValue.others.emergencyContactPhoneNumber,
            relationStatus: submittedValue.others.emergencyContactRelation
          }
        });
        console.info('updating emergency contact id on candidate table...');
        await tx.candidates.update({
          where: {
            id: authSession.candidate.id
          },
          data: {
            emengencyContactId: emergencyContact.id
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

export async function updateCandidateDocuments(submittedValue: any): Promise<TypeReturnedServerAction> {
  // console.info("[server] -> ", submittedValue);
  const authSession = await getUserSession('auth');
  try {
    const updateDocuments = await prisma.$transaction(async (tx) => {
      /* Get Identity Info ID */
      console.info("Checking Identity Info ID...");
      const checkIdentityInfo = await tx.candidates.findUnique({
        where: {
          id: authSession.candidate.id
        },
        select: {
          identityInfoId: true
        }
      });
      /* Store candidate identity info */
      if(!checkIdentityInfo?.identityInfoId) {
        console.info("Storing Identity Info...");
        const storeIdentityInfo = await tx.identity_info.create({
          data: {
            bank_account: submittedValue.bankAccountNumber,
            family_number: submittedValue.kkNumber,
            id_card_number: submittedValue.idNumber,
            tax_number: submittedValue.npwpNumber
          }
        });
        console.info("Updating candidate Identity Info ID...");
        await tx.candidates.update({
          where: {
            id: authSession.candidate.id
          },
          data: {
            identityInfoId: storeIdentityInfo.id
          }
        });
      } else {
        /* Update candidate identity info */
        console.info("Updating candidate Identity Info data...");
        await tx.identity_info.update({
          where: {
            id: checkIdentityInfo?.identityInfoId as number
          },
          data: {
            bank_account: submittedValue.bankAccountNumber,
            family_number: submittedValue.kkNumber,
            id_card_number: submittedValue.idNumber,
            tax_number: submittedValue.npwpNumber
          }
        });
      };
      /* Updating candidate Documents */
      /* ID CARD KTP/PASSPORT */
      if(submittedValue.idFile) {
        console.info("Checking candidate ID card document...");
        const idCardDoc = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 4 } // -> id ktp/passport
        });
        if(!idCardDoc) {
          console.info("Creating new ID card document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.idFile.original_name,
              byte_size: submittedValue.idFile.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.idFile.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 4,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing ID card document...");
          await tx.documents.update({
            where: {
              id: idCardDoc?.id,
              // documentTypeId: 4
            },
            data: {
              original_name: submittedValue.idFile.original_name,
              byte_size: submittedValue.idFile.byte_size,
              file_base: Buffer.from(submittedValue.idFile.file_base)
            }
          });
        };
      };
      /* BANK BCA */
      if(submittedValue.bankAccount) {
        console.info("Checking candidate Bank BCA card document...");
        const idBankBCA = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 7 } // -> id bank BCA card
        });
        if(!idBankBCA) {
          console.info("Creating new Bank BCA card document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.bankAccount.original_name,
              byte_size: submittedValue.bankAccount.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.bankAccount.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 7,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Bank BCA card document...");
          await tx.documents.update({
            where: {
              id: idBankBCA?.id,
              // documentTypeId: 7
            },
            data: {
              original_name: submittedValue.bankAccount.original_name,
              byte_size: submittedValue.bankAccount.byte_size,
              file_base: Buffer.from(submittedValue.bankAccount.file_base)
            }
          });
        };
      };
      /* Medical Check-Up */
      if(submittedValue.mcu) {
        console.info("Checking candidate Medical Check-Up...");
        const idMCU = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 8 }
        });
        console.info("Medical Check-Up check record : ", idMCU);
        if(!idMCU) {
          console.info("Creating new Medical Check-Up document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.mcu.original_name,
              byte_size: submittedValue.mcu.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.mcu.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 8,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Medical Check-Up document...");
          await tx.documents.update({
            where: { id: idMCU.id },
            data: {
              original_name: submittedValue.mcu.original_name,
              byte_size: submittedValue.mcu.byte_size,
              file_base: Buffer.from(submittedValue.mcu.file_base)
            }
          });
        };
      };
      /* Healt Certf */
      if(submittedValue.healthCertificate) {
        console.info("Checking candidate Health Certf document...");
        const idHealth = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 9 } // -> id MCUHealth
        });
        console.info("Health Certf Check record : ", idHealth);
        if(!idHealth) {
          console.info("Creating new Health Certf document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.healthCertificate.original_name,
              byte_size: submittedValue.healthCertificate.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.healthCertificate.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 9,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Health Certf document...");
          await tx.documents.update({
            where: {
              id: idHealth?.id,
              // documentTypeId: 8
            },
            data: {
              original_name: submittedValue.healthCertificate.original_name,
              byte_size: submittedValue.healthCertificate.byte_size,
              file_base: Buffer.from(submittedValue.healthCertificate.file_base)
            }
          });
        };
      };
      /* Kartu Keluarga */
      if(submittedValue.kk) {
        console.info("Checking candidate Family Registration document...");
        const idKartuKeluarga = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 6 } // -> id KK
        });
        if(!idKartuKeluarga) {
          console.info("Creating new Family Registration document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.kk.original_name,
              byte_size: submittedValue.kk.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.kk.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 6,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Family Registration document...");
          await tx.documents.update({
            where: {
              id: idKartuKeluarga?.id,
              // documentTypeId: 6
            },
            data: {
              original_name: submittedValue.kk.original_name,
              byte_size: submittedValue.kk.byte_size,
              file_base: Buffer.from(submittedValue.kk.file_base)
            }
          });
        };
      };
      /* Ijazah */
      if(submittedValue.latestEducation) {
        console.info("Checking candidate Ijazah document...");
        const idIjazah = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 3 } // -> id Ijazah
        });
        if(!idIjazah) {
          console.info("Creating new Ijazah document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.latestEducation.original_name,
              byte_size: submittedValue.latestEducation.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.latestEducation.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 3,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Ijazah document...");
          await tx.documents.update({
            where: {
              id: idIjazah?.id,
              // documentTypeId: 3
            },
            data: {
              original_name: submittedValue.latestEducation.original_name,
              byte_size: submittedValue.latestEducation.byte_size,
              file_base: Buffer.from(submittedValue.latestEducation.file_base)
            }
          });
        };
      };
      /* Tax/NPWP */
      if(submittedValue.npwp) {
        console.info("Checking candidate Tax document...");
        const idTax = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 5 } // -> id Tax/NPWP
        });
        if(!idTax) {
          console.info("Creating new Tax document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.npwp.original_name,
              byte_size: submittedValue.npwp.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.npwp.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 5,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Tax document...");
          await tx.documents.update({
            where: {
              id: idTax?.id,
              // documentTypeId: 5
            },
            data: {
              original_name: submittedValue.npwp.original_name,
              byte_size: submittedValue.npwp.byte_size,
              file_base: Buffer.from(submittedValue.npwp.file_base)
            }
          });
        };
      };
      /* Curriculum Vitae */
      if(submittedValue.uploadCV) {
        console.info("Checking candidate CV document...");
        const idCV = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 2 } // -> id Curriculum vitae
        });
        if(!idCV) {
          console.info("Creating new CV document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.uploadCV.original_name,
              byte_size: submittedValue.uploadCV.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.uploadCV.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 2,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing CV document...");
          await tx.documents.update({
            where: {
              id: idCV?.id,
              // documentTypeId: 2
            },
            data: {
              original_name: submittedValue.uploadCV.original_name,
              byte_size: submittedValue.uploadCV.byte_size,
              file_base: Buffer.from(submittedValue.uploadCV.file_base)
            }
          });
        };
      };
      /* Vaccine Certf */
      if(submittedValue.vaccineCertificate) {
        console.info("Checking candidate Vaccine Certf document...");
        const idVaccine = await tx.documents.findFirst({
          where: { candidate_id: authSession.candidate.id, documentTypeId: 9 } // -> id Vaccine Certf
        });
        if(!idVaccine) {
          console.info("Creating new Vaccine Certf document...");
          await tx.documents.create({
            data: {
              saved_name: uuidV4(),
              original_name: submittedValue.vaccineCertificate.original_name,
              byte_size: submittedValue.vaccineCertificate.byte_size,
              path: 'no-path',
              file_base: Buffer.from(submittedValue.vaccineCertificate.file_base),
              created_at: new Date(Date.now()),
              updated_at: new Date(Date.now()),
              documentTypeId: 9,
              candidate_id: authSession.candidate.id
            }
          });
        } else {
          console.info("Just updating existing Vaccine Certf document...");
          await tx.documents.update({
            where: {
              id: idVaccine?.id,
              // documentTypeId: 9
            },
            data: {
              original_name: submittedValue.vaccineCertificate.original_name,
              byte_size: submittedValue.vaccineCertificate.byte_size,
              file_base: Buffer.from(submittedValue.vaccineCertificate.file_base)
            }
          });
        };
      };

      return {
        success: true,
        data: null,
        errors: null,
        message: "Documents updated:"
      };
    }, {
      timeout: 60000
    });

    return updateDocuments;
  } catch (error) {
    console.info("Error update documents: ", error);
    return {
      success: false,
      data: null,
      errors: error,
      message: "Fail updating documents!"
    };
  };
};