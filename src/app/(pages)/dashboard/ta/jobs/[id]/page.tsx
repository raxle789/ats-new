import React from 'react';
import candidate_data from '@/data/candidate-data';
import JobApplicantArea from '@/app/components/dashboard/employ/job-applicant';

export const revalidate = 0;

const JobDetailsTaDynamicPage = ({ params }: { params: { id: string } }) => {
  const job = candidate_data.find((j) => Number(j.id) === Number(params.id));
  return <JobApplicantArea />;
  // return (
  //   <Wrapper>
  //     <div className="main-page-wrapper">

  //       {job && <JobDetailsV1Area job={job} />}

  //       {job && <RelatedJobs category={job.category} />}

  //     </div>
  //   </Wrapper>
  // );
};

export default JobDetailsTaDynamicPage;
