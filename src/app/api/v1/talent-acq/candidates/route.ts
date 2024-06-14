import prisma from "@/root/prisma";
import { NextRequest, NextResponse } from "next/server";
import { calculateExperiences } from "../utils";
import { Guards } from "./guard";

export async function GET(request: NextRequest) {
  try {
    /* Guard to check auth and role (admin & ta_non_admin) */
    await Guards({ request: request });
    const _PARAMS = request.nextUrl.searchParams.get('page');
    const _GETSEARCH = request.nextUrl.searchParams.get('search') as string;
    const _DEFAULTRETURN = 10;
    const _OFFSET = Number(_PARAMS) && Number(_PARAMS) > 1 ? (Number(_PARAMS) - 1) * _DEFAULTRETURN : 0;
    /* Begin transactions */
    const candidateList = await prisma.$transaction(async (tx) => {
      const count = await tx.candidates.count({
        where: {
          users: {
            name: {
              contains: _GETSEARCH
            }
          }
        }
      });
      let candidatesData = await tx.candidates.findMany({
        where: {
          users: {
            name: {
              // contains: _SEARCH == null || _SEARCH == '' ? '' : _SEARCH
              contains: _GETSEARCH
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        select: {
          documents: {
            where: { documentTypeId: 1 },
            select: { file_base: true }
          },
          users: {
            select: { name: true }
          },
          working_experiences: {
            orderBy: { end_at: 'desc' },
            // take: 1,
            select: { job_title: true, start_at: true, end_at: true }
          },
          educations: {
            select: { edu_level: true }
          },
          candidate_skills: {
            select: { skills: { select: { name: true } } }
          },
          expected_salary: true,
        },
        /**
         * If @_PARAMS type of number and greater than 1 -> return OFFSET _PARAMS * 10
         * If @_PARAMS type of number and less than equal to 1 -> return OFFSET = 0
         * If @_PARAMS NaN -> return OFFSET = 0
         */
        skip: _OFFSET,
        take: 10,
      });
      console.info("Candidate data \t:", candidatesData);
      /* Manipulated Records */
      const newRecords = candidatesData.map(candidate => {
        /* Helpers functions */
        const experiences = calculateExperiences({ experiences: candidate.working_experiences });
        return {
          ...candidate,
          documents: candidate.documents[0]?.file_base?.toString(),
          candidate_skills: candidate.candidate_skills.map(skill => skill.skills.name),
          working_experiences: experiences
        };
      });
      console.info("LENGTH \t:", newRecords.length);
      return { count: count, candidates: newRecords };
    }, {
      timeout: 30000
    });
    return NextResponse.json({
        success: true,
        data: candidateList
    });
  } catch (error) {
    console.info("Error getting candidates \t:", error);
    /* it should be custom error instance for the next development */
    if(error instanceof Error) {
      return NextResponse.json({
        success: false,
        data: null,
        message: `${error.message}, caused by ${error.cause}`
      }, { status: 400 });
    };
  };
};