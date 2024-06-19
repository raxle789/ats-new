'use client';

import React, { useEffect, useState } from 'react';
import * as crypto from '@/lib/utils/utils';
import Image, { StaticImageData } from 'next/image';
import job_data from '@/data/job-data';
import icon_1 from '@/assets/dashboard/images/icon/icon_12.svg';
import icon_2 from '@/assets/dashboard/images/icon/icon_13.svg';
import icon_3 from '@/assets/dashboard/images/icon/icon_14.svg';
import icon_4 from '@/assets/dashboard/images/icon/icon_15.svg';
import main_graph from '@/assets/dashboard/images/main-graph.png';
import DashboardHeader from './dashboard-header';
import { Alert, Button, Tag } from 'antd';
// import { getAppliedJobs } from '@/libs/Candidate/retrieve-data';
import Paragraph from 'antd/es/typography/Paragraph';
import { useRouter } from 'next/navigation';
import { getAppliedJobs } from '@/libs/Candidate/retrieve-data';

// card item
export function CardItem({
  img,
  value,
  title,
}: {
  img: StaticImageData;
  value: string;
  title: string;
}) {
  return (
    <div className="col-lg-3 col-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <Image src={img} alt="icon" className="lazy-img" />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
// }
const DashboardArea = () => {
  const job_items = [...job_data.reverse().slice(0, 5)];
  const [appliedJobs, setAppliedJobs] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const getAppliedJobsData = async () => {
    const appliedJobsSData = await getAppliedJobs();
    console.info('Applied Jobs \t: ', appliedJobsSData);
    if (appliedJobsSData.success) {
      return setAppliedJobs(appliedJobsSData.data);
    }
    return setError(appliedJobsSData.message as string);
  };

  useEffect(() => {
    getAppliedJobsData();
  }, []);

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} /> */}
      {/* header end */}

      <h2 className="main-title" style={{ marginBottom: '15px' }}>
        Dashboard
      </h2>

      <div className="row d-flex lg-pt-10">
        <div className="col-lg-6 d-flex flex-column">
          <div className="recent-job-tab bg-white border-20 mt-30 h-100">
            <h4 className="dash-title-two">Recommended Jobs 20</h4>
            <div
              className={`wrapper ${appliedJobs.length !== 0 ? 'd-flex justify-content-center align-items-center' : 'content-dashboard-user'}`}
              style={{ minHeight: '75%' }}
            >
              <Alert
                message="No Recommendations"
                description="There are no job recommendations for now"
                type="warning"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 d-flex">
          <div className="recent-job-tab bg-white border-20 mt-30 w-100">
            <h4 className="dash-title-two">Recent Applied Job 20</h4>
            <div
              className={`wrapper ${appliedJobs.length !== 0 ? '' : 'content-dashboard-user flex-column'}`}
            >
              {appliedJobs.length !== 0 ? (
                appliedJobs.map((job: any) => (
                  <div
                    key={job.id}
                    className="job-item-list d-flex align-items-center"
                    // style={{ border: '1px solid black' }}
                  >
                    {/* <div>
                      <Image
                        src={job_items[0].logo}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo"
                      />
                    </div> */}
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a
                          href="#"
                          style={{ textDecoration: 'none', cursor: 'default' }}
                        >
                          {job.jobVacancies.jobTitleAliases}
                        </a>
                      </h6>
                      <Tag
                        color={
                          job.stateName === 'WAITING'
                            ? '#FFA500'
                            : job.stateName === 'ASSESSMENT'
                              ? '#00FFFF'
                              : job.stateName === 'INTERVIEW'
                                ? '#0000FF'
                                : job.stateName === 'OFFERING'
                                  ? '##00A36C'
                                  : ''
                        }
                        style={{ marginBottom: '1rem' }}
                      >
                        {job.stateName}
                      </Tag>
                      <div className="meta row">
                        {/* <span className="col-lg-5">
                          {job.jobVacancies.positionLevels.name}
                        </span> */}
                        <span className="col-lg-7">
                          {job.jobVacancies.employmentStatusName}
                        </span>
                      </div>
                    </div>
                    <div className="job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href={`/main/jobs/${crypto.encryptData(
                              job.jobVacancyId,
                            )}`}
                            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                          >
                            View Job
                          </a>
                        </li>
                        {/* <li>
                        <a className="dropdown-item" href="#">
                          Delete
                        </a>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <Alert
                    message={'Empty Applied Jobs'}
                    description={error}
                    type="info"
                  />
                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Paragraph ellipsis>
                      Would you like to apply for the job now?
                    </Paragraph>
                    <Button
                      type="primary"
                      style={{ padding: '0rem 2rem', marginLeft: '3px' }}
                      onClick={() => router.push('/main/jobs')}
                    >
                      Go
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardArea;
