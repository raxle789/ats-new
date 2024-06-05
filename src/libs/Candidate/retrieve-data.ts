'use server';

import prisma from '@/root/prisma';
import { getUserSession } from '../Sessions';
import { string } from 'zod';
import { message } from 'antd';

export type TypeFetchReturned = {
  success: boolean;
  data: any | null;
  message: string;
};

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
    console.info('Candidate Profile \t:', candidateProfileData);
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
          include: { skills: { select: { name: true } } },
        }),
        prisma.languages.findMany({
          where: { id_of_candidate: authSession.candidate.id },
          select: { name: true, proficiency: true },
        }),
        prisma.certifications.findMany({
          where: { id_of_candidate: authSession.candidate.id },
          include: {
            certificates: {
              select: {
                name: true,
              },
            },
          },
        }),
      ]);
    // console.info('certifications \t:', certifications);
    // console.info('education: ', education);
    // console.info('skillss: ', skills);
    return {
      success: true,
      data: {
        education: education,
        skills: skills.map((skill) => skill.skills.name),
        languages: languages,
        certifications: certifications.map((certificate) => {
          return {
            institutionName: certificate.institutionName,
            issuedDate: certificate.issuedDate,
            name: certificate.certificates.name,
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

export async function getCandidateDocuments() {
  const authSession = await getUserSession('auth');
  try {
    const documentPDF = await prisma.documents.findFirst({
      where: {
        candidate_id: authSession.candidate.id,
        documentTypeId: 2,
      },
    });
    return {
      success: true,
      data: documentPDF?.file_base.toString(),
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
