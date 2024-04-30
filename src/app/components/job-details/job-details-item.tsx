import Image from 'next/image';

const JobDetailsItem = ({ jobVacancyData }) => {
  return (
    <>
      <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-xl-8">
              <div className="details-post-data me-xxl-5 pe-xxl-4">
                <h3 className="post-title">
                  {jobVacancyData?.jobTitleAliases ?? '-'}
                </h3>

                <div className="post-block border-style mt-50 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      1
                    </div>
                    <h4 className="block-title">Job Description</h4>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobVacancyData?.jobDescription ?? '-',
                    }}
                  ></div>
                </div>
                <div className="post-block border-style mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      2
                    </div>
                    <h4 className="block-title">Job Requirements</h4>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: jobVacancyData?.jobRequirement ?? '-',
                    }}
                  ></div>
                  {/* <ul className="list-type-two style-none mb-15">
                    <li>
                      You’ve been designing digital products for 2+ years.
                    </li>
                    <li>
                      A portfolio that exemplifies strong visual design and a
                      focus on defining the user experience.
                    </li>
                    <li>
                      You’ve proudly shipped and launched several products.
                    </li>
                    <li>
                      You have some past experience working in an agile
                      environment – Think two-week sprints.
                    </li>
                    <li>
                      Experience effectively presenting and communicating your
                      design decisions to clients and team members
                    </li>
                    <li>
                      Up-to-date knowledge of design software like Figma, Sketch
                      etc.
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            <div className="col-xxl-3 col-xl-4">
              <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
                <Image
                  src={jobVacancyData?.logo}
                  alt="logo"
                  className="lazy-img m-auto logo"
                  width={60}
                  height={60}
                />
                <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                  {/* {job.company} */}
                  {jobVacancyData?.verticalName ?? '-'}
                </div>

                <div className="border-top mt-20 pt-20">
                  <ul className="job-meta-data row style-none">
                    <li className="col-lg-7 col-md-4 col-sm-6">
                      <span>Job Function</span>
                      <div>{jobVacancyData?.jobFunctionName ?? '-'}</div>
                    </li>
                    <li className="col-lg-5 col-md-4 col-sm-6">
                      <span>Location</span>
                      <div>{jobVacancyData?.workLocation ?? '-'}</div>
                    </li>
                    <li className="col-lg-7 col-md-4 col-sm-6">
                      <span>Position Level</span>
                      <div>{jobVacancyData?.positionLevelName ?? '-'}</div>
                    </li>
                    <li className="col-lg-5 col-md-4 col-sm-6">
                      <span>Job Type</span>
                      <div>{jobVacancyData?.jobTypeName ?? '-'}</div>
                    </li>
                    <li className="col-lg-7 col-md-4 col-sm-6">
                      <span>Published Date</span>
                      <div>{jobVacancyData?.publishedDate ?? '-'} </div>
                    </li>
                    {/* <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Experience</span>
                    <div>{job.experience}</div>
                  </li> */}
                  </ul>
                  <a href="#" className="btn-one w-100 mt-25">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetailsItem;
