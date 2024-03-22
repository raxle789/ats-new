'use client';

import React from 'react';
import EmployShortSelect from './short-select';
import { Button, Form, Select, notification, Modal } from 'antd';
import { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Pagination from '@/ui/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useDebouncedCallback } from 'use-debounce';
import { ExpendableButton } from './expendable-button';
import Link from 'next/link';

const { confirm } = Modal;

const inisiatorData = [
  {
    inisiatorId: 1,
    inisiatorName: 'Stanly Wijaja',
    inisiatorEmail: 'stanly.widjaja@erajaya.com',
  },
  {
    inisiatorId: 2,
    inisiatorName: 'Ayam',
    inisiatorEmail: 'ayam@erajaya.com',
  },
  {
    inisiatorId: 3,
    inisiatorName: 'Ayam Goreng',
    inisiatorEmail: 'ayamgoreng@erajaya.com',
  },
  {
    inisiatorId: 4,
    inisiatorName: 'Ayam Bakar',
    inisiatorEmail: 'ayambakar@erajaya.com',
  },
];

const taData = [
  {
    taId: 1,
    taName: 'Gusti1',
  },
  {
    taId: 2,
    taName: 'Gusti2',
  },
  {
    taId: 3,
    taName: 'Gusti3',
  },
  {
    taId: 4,
    taName: 'Gusti4',
  },
];

export const fpkData = [
  {
    fpkNo: '2024/DCM/160032-01',
    jobTitle: 'Jr.Associate Principal Management',
    jobLevel: '3C',
    companyCode: 'DCM',
    fpkInisiator: 1,
    location: 'Jakarta - Erajaya Plaza',
    statusMpp: 'Replacement',
    createFpk: '9-Mar-24',
    fpkFullyApproved: '15-Mar-24',
    fpkStatus: 'Fully Approved',
    jobPosting: 'Yes',
    picTa: -1,
  },
  {
    fpkNo: '2024/DCM/160032-02',
    jobTitle: 'Jr.Associate Principal Management',
    jobLevel: '3C',
    companyCode: 'DCM',
    fpkInisiator: 2,
    location: 'Jakarta - Erajaya Plaza',
    statusMpp: 'Replacement',
    createFpk: '9-Mar-24',
    fpkFullyApproved: '15-Mar-24',
    fpkStatus: 'Fully Approved',
    jobPosting: 'No',
    picTa: 2,
  },
  {
    fpkNo: '2024/DCM/160032-03',
    jobTitle: 'Jr.Associate Principal Management',
    jobLevel: '3C',
    companyCode: 'DCM',
    fpkInisiator: 3,
    location: 'Jakarta - Erajaya Plaza',
    statusMpp: 'Replacement',
    createFpk: '9-Mar-24',
    fpkFullyApproved: '15-Mar-24',
    fpkStatus: 'Fully Approved',
    jobPosting: 'No',
    picTa: -1,
  },
  {
    fpkNo: '2024/DCM/160032-04',
    jobTitle: 'Jr.Associate Principal Management',
    jobLevel: '3C',
    companyCode: 'DCM',
    fpkInisiator: 4,
    location: 'Jakarta - Erajaya Plaza',
    statusMpp: 'Replacement',
    createFpk: '9-Mar-24',
    fpkFullyApproved: '15-Mar-24',
    fpkStatus: 'Fully Approved',
    jobPosting: 'Yes',
    picTa: 4,
  },
];

const EmployJobFpk = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '2';
  const searchQuery = searchParams.get('query') || '';

  let offset = 0;
  let newFpkData = [];
  if (searchQuery) {
    offset = 0;
    newFpkData = fpkData.filter((data) => data.fpkNo.includes(searchQuery));
  } else {
    offset = (Number(page) - 1) * Number(perPage);
    newFpkData = fpkData.slice(offset, offset + Number(perPage));
  }

  const handleJobFpkSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function handleAssignTa(values: any) {
    setLoading(true);

    setTimeout(() => {
      confirm({
        title: 'Do you want to assign fpk?',
        icon: <ExclamationCircleFilled />,
        centered: true,
        content:
          'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              api.success({
                message: 'Notification',
                description: <p>Successfully Assign FPK</p>,
                placement: 'topRight',
              });
              console.info(values);
              // setSelectedRowKeys([]);
              resolve();
            }, 2000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });

      setLoading(false);
    }, 2000);
  }

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };
  return (
    <>
      {contextHolder}

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">FPK</h2>
        <div className="d-flex ms-auto xs-mt-30 justify-content-between align-items-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="search-form form-fpk"
          >
            <input
              type="text"
              placeholder="Search here.."
              onChange={(e) => handleJobFpkSearch(e.target.value)}
              defaultValue={searchParams.get('query')?.toString()}
            />
            <button type="submit">
              <Image src={search} alt="search" className="lazy-img m-auto" />
            </button>
          </form>
          <div className="short-filter d-flex align-items-center ms-auto">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div>

      <div className="bg-white card-box border-20">
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              <>
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col" className="fpk-id">
                        No
                      </th>
                      <th scope="col">FPK</th>
                      <th scope="col">Level</th>
                      <th scope="col" className="company-code">
                        Company
                      </th>
                      <th scope="col">Status EFPK</th>
                      <th scope="col">PIC TA</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFpkData?.map((data, index) => (
                      <React.Fragment key={data.fpkNo}>
                        <tr>
                          <th scope="row">{index + 1 + offset}</th>
                          <td>
                            <b>{`${data.jobTitle}\n`}</b>
                            {`${data.fpkNo}`}
                          </td>
                          <td>{`${data.jobLevel}`}</td>
                          <td>{`${data.companyCode}`}</td>

                          <td>
                            <b>
                              <span className="approved">{`${data.fpkStatus}`}</span>
                            </b>
                            <br />
                            {`${data.fpkFullyApproved}`}
                          </td>
                          <td>
                            <Form
                              name={`assignTaForm${data.fpkNo}`}
                              layout="vertical"
                              variant="filled"
                              initialValues={{
                                [`picTa${data.fpkNo}`]:
                                  data.picTa === -1 ? null : data.picTa,
                              }}
                              onFinish={handleAssignTa}
                            >
                              <Form.Item name={`picTa${data.fpkNo}`}>
                                <Select
                                  className="select"
                                  showSearch
                                  allowClear
                                  placeholder="Select TA"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? '').includes(input)
                                  }
                                  filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                      .toLowerCase()
                                      .localeCompare(
                                        (optionB?.label ?? '').toLowerCase(),
                                      )
                                  }
                                  options={taData.map((ta) => {
                                    return {
                                      label: ta.taName,
                                      value: ta.taId,
                                    };
                                  })}
                                />
                              </Form.Item>
                              <Form.Item>
                                <Button htmlType="submit">Assign</Button>
                              </Form.Item>
                            </Form>
                          </td>
                          <td>
                            <ExpendableButton
                              isOpen={expandedRows[index]}
                              toggle={() => toggleRowExpansion(index)}
                            />
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td></td>
                            <td colSpan={5}>
                              <div
                                className={
                                  expandedRows[index]
                                    ? 'expanded-row open'
                                    : 'expanded-row'
                                }
                              >
                                <div className="row">
                                  <div className="col-6">
                                    <p>
                                      <b>Inisiator: </b>
                                      {`${inisiatorData.filter((inisiator) => inisiator.inisiatorId === data.fpkInisiator)[0]?.inisiatorName}`}
                                    </p>
                                    <p>
                                      <b>Email: </b>
                                      {`${inisiatorData.filter((inisiator) => inisiator.inisiatorId === data.fpkInisiator)[0]?.inisiatorEmail}`}
                                    </p>
                                    <p>
                                      <b>Location: </b>
                                      {`${data.location}`}
                                    </p>
                                  </div>
                                  <div className="col-lg-6">
                                    <p>
                                      <b>Create FPK: </b>
                                      {`${data.createFpk}`}
                                    </p>
                                    <p>
                                      <b>Status Mpp: </b>
                                      {`${data.statusMpp}`}
                                    </p>
                                    <p>
                                      <b>Job Posting: </b>
                                      {data.jobPosting === 'Yes' && (
                                        <Link href="#">{`${data.jobPosting}`}</Link>
                                      )}
                                      {data.jobPosting === 'No' && (
                                        <span>{`${data.jobPosting}`}</span>
                                      )}{' '}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination disabled={searchQuery ? true : false} />
      </div>
    </>
  );
};

export default EmployJobFpk;
