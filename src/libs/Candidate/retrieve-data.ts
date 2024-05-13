'use server';

import prisma from "@/root/prisma";
import { getUserSession } from "../Sessions";

export async function getAppliedJobs(): Promise<{ success: boolean; data: any; message?: string }> {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const appliedJobs = await prisma.candidateStates.findMany({
      where: {
        candidateId: id
      },
      include: {
        jobVacancies: {
          select: {
            id: true,
            jobTitleAliases: true,
            positionLevels: {
              select: {
                name: true
              }
            },
            employmentStatusName: true,
          }
        }
      },
      orderBy: {
        assignedAt: 'desc'
      }
    });
    await prisma.$disconnect();
    return {
      success: true,
      data: appliedJobs.length === 0 ? 'No jobs have been applied for' : appliedJobs
    };
  } catch (error) {
    console.info('APPLIED JOBS ERRORS -> ', error);
    await prisma.$disconnect();
    return {
      success: false,
      data: null,
      message: 'Error when retrieve data'
    };
  };
};

export async function getProfileNCandidate() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const profileData = await prisma.documents.findFirst({
      where: {
        candidate_id: id
      },
      select: {
        saved_name: true,
        file_base: true,
        candidate: {
          include: {
            users:  true
          }
        }
      },
    });
    await prisma.$disconnect();
    console.info('PROFILE PROFILE', profileData);
    const { file_base, ...rest } = profileData;
    return {
      success: true,
      data: {
        document: file_base.toString(),
        profile: rest
      }
    };
  } catch (error) {
    console.info("Profile Data Error -> ", error);
    await prisma.$disconnect();
    return {
      success: false,
      data: null,
      message: 'Error when retrieve data'
    };
  }
};

export async function getAddress() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const addresses = await prisma.addresses.findMany({
      where: {
        candidateId: id
      }
    });
    console.info('Address -> ', addresses);
    await prisma.$disconnect();
    return {
      success: true,
      data: addresses,
    };
  } catch (error) {
    console.info("ERROR GETTING ADDRESS -> ", error);
    await prisma.$disconnect();
    return {
      success: false,
      data: null,
      message: 'Error getting data'
    };
  };
};

export async function getFamilies() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const families = await prisma.families.findMany({
      where: {
        candidateId: id
      }
    });
    console.info('FAMILIES -> ', families);
    await prisma.$disconnect();
    return {
      success: true,
      data: families,
    };
  } catch (error) {
    console.info('GET FAMILIES ERROR', error);
    await prisma.$disconnect();
    return {
      success: false,
      data: null,
      message: "ERROR GETTING DATA"
    };
  }
};

export async function getEducation() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const education = await prisma.educations.findFirst({
      where: {
        candidateId: id
      },
    });
    console.info('FETCHED EDUCATION -> ',education);
    await prisma.$disconnect();
    return {
      success: true,
      data: education
    };
  } catch (error) {
    console.info('ERROR FETCHED EDUCATION', error);
    return {
      success: false,
      data: null,
      message: 'Error getting education data!'
    };
  }
};

export async function getSkills() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const skills = await prisma.candidateSkills.findMany({
      where: {
        candidateId: id,
      },
      include: {
        skills: {
          select: {
            name: true
          }
        }
      }
    });
    console.info('FETCHED SKILLS -> ',skills);
    await prisma.$disconnect();
    let filteredSkills: string[] = [];
    if(skills.length > 1) {
      skills.forEach(value => {
        filteredSkills.push(value.skills.name);
      })
    };
    return {
      success: true,
      data: skills.length > 1 ? filteredSkills : 'returned'
    };
  } catch (error) {
    console.info('ERROR FETCHED EDUCATION', error);
    return {
      success: false,
      data: null,
      message: 'Error getting skills data!'
    };
  }
};

export async function getLanguages() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const languages = await prisma.languages.findMany({
      where: {
        candidateId: id,
      },
      select: {
        id: true,
        name: true,
        level: true
      }
    });
    console.info('FETCHED LANGUAGES -> ',languages);
    await prisma.$disconnect();
    let filteredLanguages: any = {};
    languages.forEach((value, index) => {
      filteredLanguages[`${index}`] = value;
    });
    console.info('FILTERED LANGUAGES', filteredLanguages);
    return {
      success: true,
      data: filteredLanguages
    };
  } catch (error) {
    console.info('ERROR FETCHED LANGUAGES', error);
    return {
      success: false,
      data: null,
      message: 'Error getting languages data!'
    };
  };
};

export async function getEmergency() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const emergency = await prisma.candidates.findFirst({
      where: {
        id: id
      },
      select: {
        emergency_contacts: true
      }
    });
    console.info('FETCHED EMERGENCY -> ', emergency);
    await prisma.$disconnect();
    return {
      success: true,
      data: emergency?.emergency_contacts
    };
  } catch (error) {
    console.info('ERROR FETCHED EMERGENCY', error);
    return {
      success: false,
      data: null,
      message: 'Error getting emergency data!'
    };
  };
};

export async function getQuestions() {
  try {
    const authUserSession = await getUserSession('auth');
    if(!authUserSession) return { success: false, data: null, message: 'User session doesnt exist' };
    const id = authUserSession.candidate.id;
    const questions = await prisma.candidateQuestions.findMany({
      where: {
        candidateId: id
      },
      select: {
        answer: true,
      }
    });
    // console.info('FETCHED QUESTIONS -> ', questions);
    await prisma.$disconnect();
    let filteredQuestion: any[] = [];
    questions.forEach((value) => {
      filteredQuestion.push(value.answer);
    });
    console.info('FILTERED QUESTIONS', filteredQuestion);
    return {
      success: true,
      data: filteredQuestion
    };
  } catch (error) {
    console.info('ERROR FETCHED QUESTIONS', error);
    return {
      success: false,
      data: null,
      message: 'Error getting questions data!'
    };
  };
}