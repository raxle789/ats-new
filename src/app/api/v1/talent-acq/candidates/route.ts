import prisma from "@/root/prisma";
import { NextRequest, NextResponse } from "next/server";
import { calculateExperiences } from "../utils";
import { Guards } from "./guard";

export async function GET(request: NextRequest) {
  try {
    /* Guard to check auth and role (admin & ta_non_admin) */
    // await Guards({ request: request });

    const _PARAMS = request.nextUrl.searchParams.get('page');
    const _GETSEARCH = request.nextUrl.searchParams.get('search') ?? '';
    const _CANDIDATEID = request.nextUrl.searchParams.get('for');
    /* For getting candidate details */
    if(request.nextUrl.searchParams.has('for') && _CANDIDATEID !== '') {
      const candidateDetails = await prisma.$transaction(async (tx) => {
        const candidateData = await tx.candidates.findUnique({
          where: { id: Number(_CANDIDATEID) },
          include: {
            addresses: {
              select: { country: true, city: true, subdistrict: true, village: true, street: true, currentAddress: true, rt: true, rw: true, zipCode: true }
            },
            educations: {
              select: { edu_level: true, university_name: true, edu_major: true, gpa: true, city: true, start_year: true, end_year: true  }
            },
            languages: {
              select: { id: true, name: true, proficiency: true }
            },
            working_experiences: true,
            families: {
              select: { id: true, relation: true, name: true, gender: true, dateOfBirth: true }
            },
            candidate_questions: { select: { questionId: true, answer: true } },
            sources: true,
            emergency_contacts: {
              select: { relationStatus: true, name: true, phoneNumber: true }
            },
            documents: {
              select: {
                original_name: true,
                file_base: true,
                document_types: true
              }
            },
            candidateStates: {
              select: {
                candidateId: true,
                assignedAt: true,
                stateName: true,
                jobVacancies: {
                  select: {
                    jobTitleAliases: true
                  }
                }
              }
            },
            interview_results: true
          }
        });
        const { candidateStates, ...rest } = candidateData as any;
        return {
          ...rest,
          source_referer: candidateData?.sources?.name,
          addresses: candidateData?.addresses[0],
          working_experiences: candidateData?.working_experiences.map(value => ({
            ...value,
            salary: Number(value.salary)
          })),
          documents: candidateData?.documents.map(value => ({
            ...value,
            file_base: value.file_base.toString(),
            document_types: value.document_types?.document_name
          })),
          applicantion_history: candidateData?.candidateStates.map(value => ({
            // ...value,
            job_title: value.jobVacancies.jobTitleAliases,
            apply_date: value.assignedAt,
            status: value.stateName
          }))
        };
      }, {
        timeout: 10000
      });
      return NextResponse.json({
        success: true,
        data: candidateDetails
      });
    };
    const _DEFAULTRETURN = 10;
    /**
     * Only return OFFSET if params is a valid number and more than one (1)
     */
    const _OFFSET = Number(_PARAMS) && Number(_PARAMS) > 1 ? (Number(_PARAMS) - 1) * _DEFAULTRETURN : 0;
    /* Begin transactions */
    const candidateList = await prisma.$transaction(async (tx) => {
      const count = await tx.candidates.count({
        where: { users: { name: { contains: _GETSEARCH } } }
      });
      let candidatesData = await tx.candidates.findMany({
        where: { users: { name: { contains: _GETSEARCH } } },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
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
        skip: _OFFSET,
        take: 10,
      });
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