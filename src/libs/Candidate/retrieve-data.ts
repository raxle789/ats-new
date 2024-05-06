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