'use client';

import React from 'react';
import DashboardHeader from '../candidate/dashboard-header';
import EmployJobItem from './job-item';
import EmployShortSelect from './short-select';
import { Table, Button, Form, Select, notification, Modal } from 'antd';
import { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';

// props type
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
// };

const { confirm } = Modal;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: { key: number; name: string; age: number; address: string }[] = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const EmployJobFpk = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  //   const start = () => {
  //     setLoading(true);
  //     // ajax request after empty completing
  //     setTimeout(() => {
  //       console.info(selectedRowKeys);

  //       setSelectedRowKeys([]);

  //       setLoading(false);
  //     }, 2000);
  //   };

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  function handleJobFpk(values) {
    setLoading(true);
    // ajax request after empty completing
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
              console.info(selectedRowKeys, values);
              setSelectedRowKeys([]);
              resolve();
            }, 2000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });

      setLoading(false);
    }, 2000);
  }

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}

      {contextHolder}

      <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0">FPK</h2>
        <div className="d-flex ms-auto xs-mt-30">
          <div
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
          </div>
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

              <Form layout="vertical" variant="filled" onFinish={handleJobFpk}>
                <div className="dash-input-wrapper mb-30">
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
                </Form.Item>
              </Form>
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

      {/* <div className="dash-pagination d-flex justify-content-end mt-30">
        <ul className="style-none d-flex align-items-center">
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
        </ul>
      </div> */}
    </>
  );
};

export default EmployJobFpk;
