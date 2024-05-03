'use client';

import Image from 'next/image';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import {
  Cascader,
  Spin,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Checkbox,
  Col,
  Row,
  Slider,
  Radio,
  Button,
  notification,
  Modal,
} from 'antd';
import { useRouter } from 'next/navigation';

const { confirm } = Modal;

const JobDetailsItem = ({ jobVacancyData, candidateApplyJobVacancy }) => {
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState(false);

  function handleCandidateApplyJobVacancy(jobId) {
    setLoading(true);

    confirm({
      title: 'Do you want to create new job parameter?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            api.success({
              message: 'Notification',
              description: <p>Successfully Create New Job Parameter</p>,
              placement: 'topRight',
            });
            // console.info(values);
            candidateApplyJobVacancy(jobId)
              .then(() => {
                setLoading(false);

                router.refresh();
              })
              .catch((e: string) => {
                console.log('Error apply job vacancy: ', e);

                setLoading(false);

                router.refresh();
              });
            // router.replace('/dashboard/ta/parameter');
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        setLoading(false);

        router.refresh();
      },
    });
  }

  return (
    <Spin spinning={loading}>
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
                  <Form
                    name={`candidateApplyJobVacancyForm${jobVacancyData?.jobId}`}
                    layout="vertical"
                    variant="filled"
                  >
                    <Form.Item name="candidateApplyBtn">
                      <Button
                        htmlType="button"
                        disabled={jobVacancyData?.candidateAlreadyApply}
                        className="btn-one w-100 mt-25 d-flex align-items-center justify-content-center"
                        onClick={() =>
                          handleCandidateApplyJobVacancy(jobVacancyData?.jobId)
                        }
                      >
                        {jobVacancyData?.candidateAlreadyApply
                          ? 'Applied'
                          : 'Apply'}
                      </Button>
                    </Form.Item>
                  </Form>
                  {/* <button
                    type="button"
                    className="btn-one w-100 mt-25"
                    onClick={() => {
                      candidateApplyJobVacancy(jobVacancyData?.jobId);

                      router.refresh();
                    }}
                  >
                    Apply Now
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Spin>
  );
};

export default JobDetailsItem;
