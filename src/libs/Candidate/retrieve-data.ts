'use server';

import prisma from '@/root/prisma';
import { getUserSession } from '../Sessions';

export type TypeFetchReturned = {
  success: boolean;
  data: any | null;
  message: string;
};

export async function getUserProfilePicture() {
  const authSession = await getUserSession('auth');
  try {
    const profilePicture = await prisma.documents.findFirst({
      where: {
        candidate_id: authSession.candidate.id,
        documentTypeId: 1
      },
      select: {
        file_base: true
      }
    })
    return {
      file_base: profilePicture?.file_base?.toString()
    }
  } catch (error) {
    console.info("Error getting profile picture \t:", error);
    return {
      file_base: null
    }
  }
}

export async function getCandidateProfile(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const candidateProfileData = await prisma.candidates.findFirst({
      where: {
        id: authSession.candidate.id,
      },
      include: {
        addresses: true, // it can be array of addresses
        users: {
          select: {
            name: true,
            email: true,
          },
        },
        documents: {
          where: {
            candidate_id: authSession.candidate.id,
            documentTypeId: 1,
          },
          select: {
            file_base: true,
          },
        },
        sources: {
          select: {
            name: true,
          },
        },
      },
    });
    // console.info('Candidate Profile \t:', candidateProfileData);
    return {
      success: true,
      data: {
        ...candidateProfileData,
        sources: candidateProfileData?.sources?.name,
        documents: candidateProfileData?.documents[0].file_base.toString(),
      },
      message: 'Data fetched:',
    };
  } catch (error) {
    console.info('Fetch Error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fail fetch data',
    };
  }
}

export async function getCandidateExperiences(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const [experiences, expectedSalary] = await prisma.$transaction([
      prisma.working_experiences.findMany({
        where: { id_of_candidate: authSession.candidate.id },
      }),
      prisma.candidates.findUnique({
        where: { id: authSession.candidate.id },
        select: { expected_salary: true },
      }),
    ]);
    return {
      success: true,
      data: {
        expectedSalary: expectedSalary?.expected_salary,
        experiences: experiences,
      },
      message: 'Data fetched: expected-salary',
    };
  } catch (error) {
    console.info('Fetch error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fail fetch data',
    };
  }
}

export async function getEducationSkills(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const [education, skills, languages, certifications] =
      await prisma.$transaction([
        prisma.educations.findUnique({
          where: { id_of_candidate: authSession.candidate.id },
        }),
        prisma.candidateSkills.findMany({
          where: { id_of_candidate: authSession.candidate.id },
          include: { skills: { select: { id: true, name: true } } },
        }),
        prisma.languages.findMany({
          where: { id_of_candidate: authSession.candidate.id },
          select: { id: true, name: true, proficiency: true },
        }),
        prisma.certifications.findMany({
          where: { id_of_candidate: authSession.candidate.id },
          include: {
            certificates: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
      ]);

    return {
      success: true,
      data: {
        education: education,
        // skills: skills.map((skill) => skill.skills.id),
        skills: skills.map(skill => {
          return {
            id: skill.skills.id,
            name: skill.skills.name
          }
        }),
        languages: languages,
        certifications: certifications.map((certificate) => {
          return {
            id: certificate.id,
            institutionName: certificate.institutionName,
            issuedDate: certificate.issuedDate,
            name: certificate.certificates.name,
            id_of_certificate: certificate.certificates.id
          };
        }),
      },
      message: 'Data fetched:',
    };
  } catch (error) {
    console.info('Fetching Error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    };
  }
}

export async function getAdditionalInformations(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const [families, emergencyContact, candidateQuestions] =
      await prisma.$transaction([
        prisma.families.findMany({
          where: { id_of_candidate: authSession.candidate.id },
        }),
        prisma.candidates.findFirst({
          where: { id: authSession.candidate.id },
          select: { emergency_contacts: true },
        }),
        prisma.candidateQuestions.findMany({
          where: { candidateId: authSession.candidate.id },
          select: { questionId: true, answer: true },
        }),
      ]);
    return {
      success: true,
      data: {
        families: families,
        emergency_contact: emergencyContact?.emergency_contacts,
        candidate_questions: candidateQuestions,
      },
      message: 'Data fetched: ',
    };
  } catch (error) {
    console.info('Fetching Error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    };
  }
}

export async function getCandidateDocuments(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const [cv, ijazah, ktp, npwp, kk, bca, mcu, health_certf, vaksin, identityInfo] = await prisma.$transaction([
      prisma.documents.findFirst({ // cv
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 2
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // ijazah
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 3
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // ktp/passport
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 4
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // tax/npwp
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 5
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // kk
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 6
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // bca
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 7
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // mcu
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 8
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // health certf
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 9
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.documents.findFirst({ // vaccine certf
        where: {
          candidate_id: authSession.candidate.id,
          documentTypeId: 10
        },
        select: {
          file_base: true,
          original_name: true
        }
      }),
      prisma.candidates.findUnique({
        where: {
          id: authSession.candidate.id
        },
        select: {
          identity_info: {
            select: {
              bank_account: true,
              family_number: true,
              id_card_number: true,
              tax_number: true,
            }
          }
        }
      })
    ]);

    return {
      success: true,
      data: {
        identity_info: identityInfo?.identity_info,
        curriculum_vitae: cv?.file_base.toString() ?? null,
        curriculum_vitae_name: cv?.original_name ?? null,
        ijazah: ijazah?.file_base.toString() ?? null,
        ijazah_name: ijazah?.original_name ?? null,
        identity_card: ktp?.file_base.toString() ?? null,
        identity_card_name: ktp?.original_name ?? null,
        tax: npwp?.file_base.toString() ?? null,
        tax_name: npwp?.original_name ?? null,
        family_registration: kk?.file_base.toString() ?? null,
        family_registration_name: kk?.original_name ?? null,
        bca_card: bca?.file_base.toString() ?? null,
        bca_card_name: bca?.original_name ?? null,
        mcu: mcu?.file_base.toString() ?? null,
        mcu_name: mcu?.original_name ?? null,
        health_certificate: health_certf?.file_base.toString() ?? null,
        health_certificate_name: health_certf?.original_name ?? null,
        vaccine_certf: vaksin?.file_base.toString() ?? null,
        vaccine_certf_name: vaksin?.original_name ?? null
      },
      message: 'Data Fetched:'
    };
  } catch (error) {
    console.info('Fetching Error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    };
  }
}

export async function getAppliedJobs(): Promise<TypeFetchReturned> {
  const authSession = await getUserSession('auth');
  try {
    const appliedJobData = await prisma.candidateStates.findMany({
      where: {
        candidateId: authSession.candidate.id,
      },
      select: {
        id: true,
        stateName: true,
        jobVacancies: {
          select: {
            jobTitleAliases: true,
            workLocationAddress: true,
            employmentStatusName: true,
            verticalCode: true,
            publishedDate: true,
            expiredDate: true,
          },
        },
      },
    });
    // console.log('APPLIED \t:', appliedJobData);
    return {
      success: true,
      data: appliedJobData,
      message: 'Data Fetched:',
    };
  } catch (error) {
    console.info('Fetching Error: ', error);
    return {
      success: false,
      data: null,
      message: 'Fetching Error: There is a problem with database connection: ',
    };
  };
};
