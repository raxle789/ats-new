import React, { useState } from 'react';
import ActionAppliedJobs from './action-applied-jobs';
import JobPipelineModal from '../../common/popup/job-pipeline-modal';
import SearchBar from '@/ui/search-bar';
import EmployShortSelect from '../employ/short-select';

const appliedJobs = [
  {
    id: 1,
    jobTitle: 'Danil Mukbang',
    positionLevel: 'Assitant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 2,
    jobTitle: 'Danil Makan Udang Rambutan',
    positionLevel: 'Assitant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 3,
    jobTitle: 'Danil onChange',
    positionLevel: 'Assitant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 4,
    jobTitle: 'Danil lagi Kesel',
    positionLevel: 'Assitant Manager',
    applyDate: '5-6-2024',
    status: 'assessment',
  },
  {
    id: 5,
    jobTitle: 'Danil si wota',
    positionLevel: 'Assitant Manager',
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
                    <th scope="col">No</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Level</th>
                    <th scope="col">Apply Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs?.map((data: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{data.id}</td>
                        <td>
                          <a
                            className="tran3s"
                            style={{ cursor: 'pointer' }}
                            onClick={showModal}
                          >
                            {data.jobTitle}
                          </a>
                        </td>
                        <td>{data.positionLevel}</td>
                        <td>{data.applyDate}</td>
                        <td>{data.status}</td>
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
                            {/* <ActionJobVacancies
                              jobId={data?.jobId}
                              setLoading={setLoading}
                            /> */}
                            <ActionAppliedJobs />
                            {/* action dropdown end */}
                          </div>
                        </td>
                        {/* <td>
                          <Form
                            // form={form}
                            ref={(el) =>
                              (formRef.current[data?.requestNo] = el)
                            }
                            name={`assignTaForm${data?.requestNo}`}
                            layout="vertical"
                            variant="filled"
                            // initialValues={{
                            //   ['taId']: data?.taId,
                            //   ['efpkRequestNo']: data?.requestNo,
                            // }}
                            onFinish={handleAssignTa}
                          >
                            <Form.Item name="taId">
                              <Select
                                className="select"
                                showSearch
                                allowClear
                                onChange={(value) =>
                                  handleChange(value, data?.requestNo)
                                }
                                placeholder="Select TA"
                                optionFilterProp="children"
                                // value={data.TaId}
                                filterOption={(input, option) =>
                                  (option?.label ?? '').includes(input)
                                }
                                options={
                                  Array.isArray(taData)
                                    ? taData.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                        disabled: item.value === data?.taId,
                                      }))
                                    : []
                                }
                              />
                            </Form.Item>
                            <Form.Item className="d-none" name="efpkRequestNo">
                              <Input className="d-none" type="hidden" />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                disabled={!assignDisabled[data?.requestNo]}
                              >
                                Assign
                              </Button>
                            </Form.Item>
                          </Form>
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center">
                            <ExpendableButton
                              isOpen={expandedRows[index]}
                              toggle={() => toggleRowExpansion(index)}
                            />
                          </div>
                        </td> */}
                      </tr>
                      {/* {expandedRows[index] && (
                        <tr>
                          <td></td>
                          <td colSpan={5}>
                            <div
                              className={
                                expandedRows[index]
                                  ? 'expanded-row-open'
                                  : 'expanded-row-close'
                              }
                            >
                              <div className="row">
                                <div className="col-6">
                                  <p>
                                    <b>Initiator: </b>
                                    {`${data?.initiatorName ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Position: </b>
                                    {`${data?.initiatorJobTitleName ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Email: </b>
                                    {`${data?.initiatorEmail ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Phone Number: </b>
                                    {`${data?.initiatorPhone ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Location: </b>
                                    {`${data?.locationName ?? '-'}`}
                                  </p>
                                </div>
                                <div className="col-lg-6">
                                  <p>
                                    <b>Create FPK: </b>
                                    {`${data?.createDate ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Status Mpp: </b>
                                    {`${data?.reason ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Job Posting: </b>
                                    {`${data?.totalJobVacancies ? 'Yes (' + data.totalJobVacancies + ')' : 'No'}`}
                                  </p>
                                  <p>
                                    <b>Total Need: </b>
                                    {`${data?.totalNeed ?? '-'}`}
                                  </p>
                                  <p>
                                    <b>Total Relized: </b>
                                    {`${data?.totalRelized ?? '-'}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      )} */}
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
