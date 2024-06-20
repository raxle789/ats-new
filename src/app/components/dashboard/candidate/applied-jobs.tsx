import React, { useState } from 'react';
import ActionAppliedJobs from './action-applied-jobs';
import JobPipelineModal from '../../common/popup/job-pipeline-modal';
import SearchBar from '@/ui/search-bar';
import EmployShortSelect from '../employ/short-select';

const appliedJobs = [
  {
    id: 1,
    jobTitle: 'Data Analyst',
    positionLevel: 'Staff',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 2,
    jobTitle: 'Software Engineer',
    positionLevel: 'Supervisor',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 3,
    jobTitle: 'Front-end Web Developer',
    positionLevel: 'Assistant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 4,
    jobTitle: 'UI/UX Designer',
    positionLevel: 'Assistant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 5,
    jobTitle: 'AI Engineer',
    positionLevel: 'Assistant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
];

const AppliedJobs = () => {
  const [isOpenModal, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">Applied Jobs</h2>
        <div className="d-flex ms-auto xs-mt-30 justify-content-between align-items-center">
          <SearchBar />
          <div className="short-filter d-flex align-items-center ms-3">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table w-100">
                <thead>
                  <tr>
                    <th className="text-start" scope="col">
                      No
                    </th>
                    <th className="text-start" scope="col">
                      Job Title
                    </th>
                    <th className="text-start" scope="col">
                      Level
                    </th>
                    <th className="text-start" scope="col">
                      Apply Date
                    </th>
                    <th className="text-start" scope="col">
                      Status
                    </th>
                    <th className="text-start" scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs?.map((data: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{data.id}</td>
                        <td className="text-start">
                          <a
                            className="tran3s"
                            style={{ cursor: 'pointer' }}
                            onClick={showModal}
                          >
                            {data.jobTitle}
                          </a>
                        </td>
                        <td className="text-start">{data.positionLevel}</td>
                        <td className="text-start">{data.applyDate}</td>
                        <td className="text-start">{data.status}</td>
                        <td>
                          <div className="action-dots float-end">
                            <button
                              className="action-btn dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span></span>
                            </button>
                            {/* action dropdown start */}
                            <ActionAppliedJobs />
                            {/* action dropdown end */}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <JobPipelineModal isOpen={isOpenModal} setIsOpenModal={setModalOpen} />
    </>
  );
};

export default AppliedJobs;
