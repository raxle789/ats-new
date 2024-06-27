import prisma from '@/root/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { calculateExperiences } from '../utils';
import { Guards } from './guard';

export async function GET(request: NextRequest) {
  try {
    /* Guard to check auth and role (admin & ta_non_admin) */
    // await Guards({ request: request });

    const _PAGE = request.nextUrl.searchParams.get('page');
    const _GETSEARCH = request.nextUrl.searchParams.get('search') ?? '';
    const _CANDIDATEID = request.nextUrl.searchParams.get('for');
    const _ISBLACKLISTED =
      request.nextUrl.searchParams.get('blacklisted') ?? '';
    let isBlacklisted =
      request.nextUrl.searchParams.has('blacklisted') && _ISBLACKLISTED === '1'
        ? true
        : false;
    const _DEFAULTRETURN = 10;
    /**
     * Only return OFFSET if params is a valid number and more than one (1)
     */
    const _OFFSET =
      Number(_PAGE) && Number(_PAGE) > 1
        ? (Number(_PAGE) - 1) * _DEFAULTRETURN
        : 0;
    /* Details Unblacklisted Candidates */
    if (request.nextUrl.searchParams.has('for') && _CANDIDATEID !== '') {
      if (
        request.nextUrl.searchParams.has('is_blacklisted') &&
        !isNaN(Number(request.nextUrl.searchParams.get('for')))
      ) {
        const isBlacklisted = await prisma.candidates.findUnique({
          where: { id: Number(_CANDIDATEID) },
          select: { is_blacklisted: true, users: { select: { name: true } } },
        });
        switch (isBlacklisted?.is_blacklisted) {
          case true:
            return NextResponse.json({
              success: true,
              data: {
                blacklist_status: isBlacklisted.is_blacklisted,
              },
              message: `Candidate with name ${isBlacklisted.users?.name} is BLACKLISTED`,
            });
          case false:
            return NextResponse.json({
              success: true,
              data: {
                blacklist_status: isBlacklisted.is_blacklisted,
              },
              message: `Candidate with name ${isBlacklisted.users?.name} is ACTIVE`,
            });
          default:
            return NextResponse.json({
              success: true,
              data: {
                blacklist_status: null,
              },
              message: `Candidate with ID ${_CANDIDATEID} not found`,
            });
        }
      } else if (isNaN(Number(request.nextUrl.searchParams.get('for')))) {
        return NextResponse.json({
          success: false,
          data: {
            blacklist_status: false,
          },
          message: `Please provide a valid candidate ID (number)`,
        });
      }
      const candidateDetails = await prisma.$transaction(
        async (tx) => {
          const candidateData = await tx.candidates.findUnique({
            where: { id: Number(_CANDIDATEID) },
            include: {
              users: { select: { name: true, email: true } },
              addresses: {
                select: {
                  country: true,
                  city: true,
                  subdistrict: true,
                  village: true,
                  street: true,
                  currentAddress: true,
                  rt: true,
                  rw: true,
                  zipCode: true,
                },
              },
              educations: {
                select: {
                  edu_level: true,
                  university_name: true,
                  edu_major: true,
                  gpa: true,
                  city: true,
                  start_year: true,
                  end_year: true,
                },
              },
              certifications: {
                select: {
                  certificates: { select: { name: true } },
                  institutionName: true,
                  issuedDate: true,
                },
              },
              candidate_skills: {
                select: {
                  skills: { select: { name: true } },
                },
              },
              languages: {
                select: { id: true, name: true, proficiency: true },
              },
              working_experiences: true,
              families: {
                select: {
                  id: true,
                  relation: true,
                  name: true,
                  gender: true,
                  dateOfBirth: true,
                },
              },
              candidate_questions: {
                select: { questionId: true, answer: true },
              },
              sources: true,
              emergency_contacts: {
                select: { relationStatus: true, name: true, phoneNumber: true },
              },
              documents: {
                select: {
                  original_name: true,
                  file_base: true,
                  document_types: true,
                },
              },
              candidateStates: {
                select: {
                  candidateId: true,
                  assignedAt: true,
                  stateName: true,
                  jobVacancies: {
                    select: {
                      jobTitleAliases: true,
                    },
                  },
                },
              },
              interviewResults: true,
            },
          });
          const { _, ...rest } = candidateData as any; // _ is candidateState prop
          return {
            ...rest,
            source_referer: candidateData?.sources?.name,
            addresses: candidateData?.addresses[0],
            working_experiences: candidateData?.working_experiences.map(
              (value) => ({
                ...value,
                salary: Number(value.salary),
              }),
            ),
            documents: candidateData?.documents.map((value) => ({
              ...value,
              file_base: value.file_base.toString(),
              document_types: value.document_types?.document_name,
            })),
            applicantion_history: candidateData?.candidateStates.map(
              (value) => ({
                // ...value,
                job_title: value.jobVacancies.jobTitleAliases,
                apply_date: value.assignedAt,
                status: value.stateName,
              }),
            ),
            certifications: candidateData?.certifications.map(
              (certificate) => ({
                name: certificate.certificates.name,
                institution_name: certificate.institutionName,
                issued_at: certificate.issuedDate,
              }),
            ),
            candidate_skills: candidateData?.candidate_skills.map(
              (skill) => skill.skills.name,
            ),
          };
        },
        {
          timeout: 10000,
        },
      );
      return NextResponse.json({
        success: true,
        data: candidateDetails,
      });
    }
    /* Candidates List */
    const candidateList = await prisma.$transaction(
      async (tx) => {
        const count = await tx.candidates.count({
          where: {
            users: { name: { contains: _GETSEARCH } },
            is_blacklisted: isBlacklisted,
          },
        });
        let candidatesData = await tx.candidates.findMany({
          where: {
            users: { name: { contains: _GETSEARCH } },
            is_blacklisted: isBlacklisted,
          },
          orderBy: { created_at: 'desc' },
          select: {
            id: true,
            documents: {
              where: { documentTypeId: 1 },
              select: { file_base: true },
            },
            users: {
              select: { name: true, email: true },
            },
            working_experiences: {
              orderBy: { end_at: 'desc' },
              // take: 1,
              select: { job_title: true, start_at: true, end_at: true },
            },
            educations: {
              select: { edu_level: true },
            },
            candidate_skills: {
              select: { skills: { select: { name: true } } },
            },
            expected_salary: true,
          },
          skip: _OFFSET,
          take: 10,
        });
        /* Manipulated Records */
        const newRecords = candidatesData.map((candidate) => {
          /* Helpers functions */
          const experiences = calculateExperiences({
            experiences: candidate.working_experiences,
          });
          return {
            ...candidate,
            documents: candidate.documents[0]?.file_base?.toString(),
            candidate_skills: candidate.candidate_skills.map(
              (skill) => skill.skills.name,
            ),
            working_experiences: experiences,
          };
        });
        return { count: count, candidates: newRecords };
      },
      {
        timeout: 30000,
      },
    );
    /* Close Connection */
    // await prisma.$disconnect();
    return NextResponse.json({
      success: true,
      data: candidateList,
    });
  } catch (error) {
    console.info('Error Endpoint \t:', request.url);
    /* Close Connection */
    // await prisma.$disconnect()
    /* it should be custom error instance for the next development */
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `${error.message}, caused by ${error.cause}`,
        },
        { status: 400 },
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    /* Guard to check auth and role (admin & ta_non_admin) */
    // await Guards({ request: request });
    const body: any = await request.json();
    console.info('JSON Body \t:', body);
    const _PARAMS = request.nextUrl.searchParams;
    switch (_PARAMS.get('operation')) {
      case 'blacklist':
        const blacklistCandidate = await prisma.candidates.update({
          where: { id: body.id },
          data: {
            is_blacklisted: true,
          },
        });
        /* Close Connection */
        await prisma.$disconnect();
        return NextResponse.json({
          success: true,
          data: blacklistCandidate,
          message: `candidate with id ${blacklistCandidate.id} was blacklisted`,
        });
      case 'assign_job':
        return NextResponse.json({
          success: true,
          data: null,
          message: `this operation will available soon`,
        });
      default:
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: `no operation match, double check to your operation params`,
          },
          {
            status: 400,
          },
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.info('Error Endpoint \t:', request.url);
      return NextResponse.json({
        success: false,
        data: null,
        message: `${error.message}, caused by ${error.cause}`,
      });
    }
  }
}
