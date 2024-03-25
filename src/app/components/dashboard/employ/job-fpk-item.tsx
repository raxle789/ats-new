'use client';

import { Button, Form, Select, Input, Modal, notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import { assignTa } from '@/lib/action/fpk/action';

const { confirm } = Modal;

const EmployJobFpkItem = ({ fpkData, offset, taData }) => {
  const formRef = useRef({});

  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const [assignDisabled, setAssignDisabled] = useState({});

  useEffect(() => {
    fpkData.forEach((data) => {
      formRef.current[data.RequestNo].setFieldsValue({
        taId: data.TaId,
        requestNo: data.RequestNo,
      });
    });
  }, [fpkData, offset]);

  const convertDate = (dateTime) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];

    if (!dateTime) {
      return 'Undefined';
    } else if (typeof dateTime === 'string') {
      const newDate = dateTime.replaceAll('/', ' ');

      const day = newDate.slice(0, 2);

      const month = monthNames[Number(newDate.slice(3, 5)) - 1];

      const year = newDate.slice(6, 10);

      return `${day}-${month}-${year}`;
    } else {
      const date = new Date(dateTime);

      const day = String(date.getDate());

      const month = monthNames[date.getMonth()];

      const year = String(date.getFullYear());

      return `${day}-${month}-${year}`;
    }
  };

  const handleAssignTa = (values) => {
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
              resolve();
            }, 2000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });

      assignTa('assignTa', values.requestNo, values.taId);

      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {contextHolder}

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="a1" role="tabpanel">
          <div className="table-responsive">
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
                  {fpkData?.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1 + offset}</th>
                      <td>{`${data?.JobTitleName ?? ''}\n${data?.RequestNo ?? ''}`}</td>
                      <td>{`${data?.JobLvlCode ?? ''}`}</td>
                      <td>{`${data?.CompCode ?? ''}`}</td>
                      <td>{`${data?.InitiatorName ?? ''}\n${data.InitiatorEmail ?? ''}`}</td>
                      <td>{`${data?.LocationName ?? ''}`}</td>
                      <td>{`${data?.Reason ?? ''}`}</td>
                      <td>{`${convertDate(data?.CreateDate ?? '')}`}</td>
                      <td>{`${convertDate(data?.ApprovalDate ?? '')}`}</td>
                      <td>{`Fully ${data?.Status ?? ''}`}</td>
                      <td>{`${data?.CandidateSource ? 'Yes' : 'No'}`}</td>
                      <td>
                        <Form
                          ref={(el) => (formRef.current[data.RequestNo] = el)}
                          name={`assignTaForm${data.RequestNo}`}
                          layout="vertical"
                          variant="filled"
                          initialValues={{
                            ['taId']: data.TaId,
                            ['requestNo']: data.RequestNo,
                          }}
                          onFinish={handleAssignTa}
                        >
                          <Form.Item name="taId">
                            <Select
                              className="select"
                              showSearch
                              allowClear
                              onChange={() =>
                                setAssignDisabled((prevState) => ({
                                  ...prevState,
                                  [data.RequestNo]: true,
                                }))
                              }
                              placeholder="Select TA"
                              optionFilterProp="children"
                              // value={data.TaId}
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={taData.map((item) => ({
                                value: item.value,
                                label: item.label,
                                disabled: item.value === data.TaId,
                              }))}
                            />
                            {/* {taData.map((item) => {
                                return (
                                  <Select.Option
                                    key={item.value}
                                    value={item.value}
                                    disabled={
                                      item.value === data.TaId ? true : false
                                    }
                                    filterOption={(input, option) =>
                                      (option?.label ?? '').includes(input)
                                    }
                                  >
                                    {item.label}
                                  </Select.Option>
                                );
                              })}
                            </Select> */}
                          </Form.Item>
                          <Form.Item className="" name="requestNo">
                            <Input
                              className=""
                              // type="hidden"
                              // value={data.RequestNo}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              disabled={!assignDisabled[data.RequestNo]}
                            >
                              Assign
                            </Button>
                          </Form.Item>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployJobFpkItem;
