import React from 'react';
import { IJobType } from '@/types/job-data-type';
import Image from 'next/image';

const JobDetailsV1Area = ({ job }: { job: IJobType }) => {
  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8">
            <div className="details-post-data me-xxl-5 pe-xxl-4">
              <h3 className="post-title">{job.title}</h3>

              <div className="post-block border-style mt-50 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    1
                  </div>
                  <h4 className="block-title">Job Description</h4>
                </div>
                <p>
                  As a <a href="#">Product Designer</a> at WillowTree, you’ll
                  give form to ideas by being the voice and owner of product
                  decisions. You’ll drive the design direction, and then make it
                  happen!
                </p>
                <p>
                  We understand our responsibility to create a diverse,
                  equitable, and inclusive place within the tech industry, while
                  pushing to make our industry more representative.{' '}
                </p>
              </div>
              <div className="post-block border-style mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    2
                  </div>
                  <h4 className="block-title">Job Requirements</h4>
                </div>
                <ul className="list-type-two style-none mb-15">
                  <li>You’ve been designing digital products for 2+ years.</li>
                  <li>
                    A portfolio that exemplifies strong visual design and a
                    focus on defining the user experience.
                  </li>
                  <li>You’ve proudly shipped and launched several products.</li>
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
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-4">
            <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
              <Image
                src={job.logo}
                alt="logo"
                className="lazy-img m-auto logo"
                width={60}
                height={60}
              />
              <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                {/* {job.company} */}
                Erajaya Food & Nourishment
              </div>

              <div className="border-top mt-20 pt-20">
                <ul className="job-meta-data row style-none">
                  <li className="col-lg-7 col-md-4 col-sm-6">
                    <span>Job Function</span>
                    <div>IT & Software</div>
                  </li>
                  <li className="col-lg-5 col-md-4 col-sm-6">
                    <span>Location</span>
                    <div>Erajaya Plaza</div>
                  </li>
                  <li className="col-lg-7 col-md-4 col-sm-6">
                    <span>Position Level</span>
                    <div>Assisstant Manager</div>
                  </li>
                  <li className="col-lg-5 col-md-4 col-sm-6">
                    <span>Job Type</span>
                    <div>{job.duration}</div>
                  </li>
                  <li className="col-lg-7 col-md-4 col-sm-6">
                    <span>Published Date</span>
                    <div>{job.date} </div>
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
  );
};

export default JobDetailsV1Area;
