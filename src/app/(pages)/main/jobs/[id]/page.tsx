import React from 'react';
import Wrapper from '@/layouts/wrapper';
import Header from '@/layouts/headers/header';
import JobDetailsArea from '@/app/components/job-details/job-details-area';
import JobPortalIntro from '@/app/components/job-portal-intro/job-portal-intro';
import JobDetailsBreadcrumb from '@/app/components/jobs/breadcrumb/job-details-breadcrumb';
import RelatedJobs from '@/app/components/jobs/related-jobs';
import FooterOne from '@/layouts/footers/footer-one';
import job_data from '@/data/job-data';

export const revalidate = 0;

const JobDetails = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div>
        <JobDetailsBreadcrumb />

        <JobDetailsArea params={params} />

        {/* <RelatedJobs /> */}
      </div>
    </Wrapper>
  );
};

export default JobDetails;
