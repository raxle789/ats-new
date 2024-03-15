'use client';

import React from 'react';
import DashboardHeader from '../candidate/dashboard-header';
import EmployJobItem from './job-item';
import EmployShortSelect from './short-select';
import { Table, Button, Form, Select, notification, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import Pagination from '@/ui/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useDebouncedCallback } from 'use-debounce';

// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

const { confirm } = Modal;

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];

// const data: { key: number; name: string; age: number; address: string }[] = [];

// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

const userData = [
  {
    userId: 1,
    userName: 'Stanly Wijaja',
    userEmail: 'stanly.widjaja@erajaya.com',
  },
  {
    userId: 2,
    userName: 'Ayam',
    userEmail: 'ayam@erajaya.com',
  },
  {
    userId: 3,
    userName: 'Ayam Goreng',
    userEmail: 'ayamgoreng@erajaya.com',
  },
  {
    userId: 4,
    userName: 'Ayam Bakar',
    userEmail: 'ayambakar@erajaya.com',
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
    fpkUser: 1,
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
    fpkUser: 2,
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
    fpkUser: 3,
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
    fpkUser: 4,
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
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  //   const start = () => {
  //     setLoading(true);
  //     // ajax request after empty completing
  //     setTimeout(() => {
  //       console.info(selectedRowKeys);

  //       setSelectedRowKeys([]);

  //       setLoading(false);
  //     }, 2000);
  //   };

  // const onSelectChange = (newSelectedRowKeys) => {
  //   // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  // const hasSelected = selectedRowKeys.length > 0;

  const handleJobFpkSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function handleAssignTa(values) {
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

  // function handleJobFpk(values) {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     confirm({
  //       title: 'Do you want to assign fpk?',
  //       icon: <ExclamationCircleFilled />,
  //       centered: true,
  //       content:
  //         'When clicked the OK button, this dialog will be closed after 1 second',
  //       onOk() {
  //         return new Promise<void>((resolve, reject) => {
  //           setTimeout(() => {
  //             api.success({
  //               message: 'Notification',
  //               description: <p>Successfully Assign FPK</p>,
  //               placement: 'topRight',
  //             });
  //             console.info(selectedRowKeys, values);
  //             setSelectedRowKeys([]);
  //             resolve();
  //           }, 2000);
  //         }).catch(() => console.log('Oops errors!'));
  //       },
  //       onCancel() {},
  //     });

  //     setLoading(false);
  //   }, 2000);
  // }

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}

      {contextHolder}

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">FPK</h2>
        <div className="d-flex flex-grow-1 ms-auto xs-mt-30 justify-content-between align-items-center">
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
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
          {/* <div
            className="nav nav-tabs tab-filter-btn me-4"
            id="nav-tab"
            role="tablist"
          >
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#a1"
              type="button"
              role="tab"
              aria-selected="true"
            >
              All
            </button>
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#a2"
              type="button"
              role="tab"
              aria-selected="false"
            >
              New
            </button>
          </div>
          <div className="short-filter d-flex align-items-center ms-auto">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <EmployShortSelect />
          </div> */}
        </div>
      </div>

      <div className="bg-white card-box border-20">
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
              {/* <table className="table job-alert-table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Job Created</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  <EmployJobItem
                    title="Brand & Producr Designer"
                    info="Fulltime . Spain"
                    application="130"
                    date="05 Jun, 2023"
                    status="active"
                  />

                  <EmployJobItem
                    title="Marketing Specialist"
                    info="Part-time . Uk"
                    application="20"
                    date="13 Aug, 2023"
                    status="pending"
                  />

                  <EmployJobItem
                    title="Accounting Manager"
                    info="Fulltime . USA"
                    application="278"
                    date="27 Sep, 2023"
                    status="expired"
                  />

                  <EmployJobItem
                    title="Developer for IT company"
                    info="Fulltime . Germany"
                    application="70"
                    date="14 Feb, 2023"
                    status="active"
                  />
                </tbody>
              </table> */}

              <>
                <table className="table caption-top">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">FPK</th>
                      <th scope="col">Level</th>
                      <th scope="col">Company Code</th>
                      <th scope="col">User</th>
                      <th scope="col">Location</th>
                      <th scope="col">Status MPP</th>
                      <th scope="col">Create FPK</th>
                      <th scope="col">FPK Fully Approved</th>
                      <th scope="col">Status EFPK</th>
                      <th scope="col">Job Posting</th>
                      <th scope="col">PIC TA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newFpkData?.map((data, index) => (
                      <tr key={data.fpkNo}>
                        <th scope="row">{index + 1 + offset}</th>
                        <td>{`${data.jobTitle}\n${data.fpkNo}`}</td>
                        <td>{`${data.jobLevel}`}</td>
                        <td>{`${data.companyCode}`}</td>
                        <td>{`${userData.filter((user) => user.userId === data.fpkUser)[0]?.userName}\n${userData.filter((user) => user.userId === data.fpkUser)[0]?.userEmail}`}</td>
                        <td>{`${data.location}`}</td>
                        <td>{`${data.statusMpp}`}</td>
                        <td>{`${data.createFpk}`}</td>
                        <td>{`${data.fpkFullyApproved}`}</td>
                        <td>{`${data.fpkStatus}`}</td>
                        <td>{`${data.jobPosting}`}</td>
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
                      </tr>
                    ))}
                    {/* <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr> */}
                  </tbody>
                </table>
                {/* <div className="dash-input-wrapper mb-30">
                  <Form.Item
                    label="TA"
                    name="ta"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select TA!',
                      },
                    ]}
                  >
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
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Not Identified',
                        },
                        {
                          value: '2',
                          label: 'Closed',
                        },
                        {
                          value: '3',
                          label: 'Communicated',
                        },
                        {
                          value: '4',
                          label: 'Identified',
                        },
                        {
                          value: '5',
                          label: 'Resolved',
                        },
                        {
                          value: '6',
                          label: 'Cancelled',
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div>
                  <span>
                    {hasSelected
                      ? `Selected ${selectedRowKeys.length} items`
                      : ''}
                  </span>
                </div>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                />
                <Form.Item>
                  <Button
                    type="primary"
                    disabled={!hasSelected}
                    loading={loading}
                    htmlType="submit"
                  >
                    Assign FPK
                  </Button>
                </Form.Item> */}
              </>
            </div>
          </div>
          {/* <div className="tab-pane fade" id="a2" role="tabpanel">
            <div className="table-responsive">
              <table className="table job-alert-table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Job Created</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  <EmployJobItem
                    title="Marketing Specialist"
                    info="Part-time . Uk"
                    application="20"
                    date="13 Aug, 2023"
                    status="pending"
                  />

                  <EmployJobItem
                    title="Brand & Producr Designer"
                    info="Fulltime . Spain"
                    application="130"
                    date="05 Jun, 2023"
                    status="active"
                  />

                  <EmployJobItem
                    title="Developer for IT company"
                    info="Fulltime . Germany"
                    application="70"
                    date="14 Feb, 2023"
                    status="active"
                  />

                  <EmployJobItem
                    title="Accounting Manager"
                    info="Fulltime . USA"
                    application="278"
                    date="27 Sep, 2023"
                    status="expired"
                  />
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination disabled={searchQuery ? true : false} />
        {/* <ul className="style-none d-flex align-items-center">
          <li>
            <a href="#" className="active">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>..</li>
          <li>
            <a href="#">7</a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul> */}
      </div>
    </>
  );
};

export default EmployJobFpk;
