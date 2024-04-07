'use client';
import React from 'react';
import { Button, Form, Select, Input, Modal, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import { ExpendableButton } from './expendable-button';

const { confirm } = Modal;

const EmployJobFpkItem = ({ fpkData, offset, taData, assignTa }) => {
  const formRef = useRef({});

  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const [assignDisabled, setAssignDisabled] = useState({});

  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  const setFormDefaultValue = async () => {
    if (fpkData) {
      await Promise.all(
        fpkData?.map(async (data) => {
          await formRef.current[data?.requestNo]?.setFieldsValue({
            efpkRequestNo: data?.requestNo,
            taId: data?.taId,
          });
        }),
      );
    }
  };

  useEffect(() => {
    setFormDefaultValue();
  }, [fpkData, offset]);

  // const convertDate = (dateTime: any) => {
  //   const monthNames = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Okt',
  //     'Nov',
  //     'Des',
  //   ];

  //   if (!dateTime) {
  //     return 'Undefined';
  //   } else if (typeof dateTime === 'string') {
  //     const newDate = dateTime.replaceAll('/', ' ');
  //     const day = newDate.slice(0, 2);
  //     const month = monthNames[Number(newDate.slice(3, 5)) - 1];
  //     const year = newDate.slice(6, 10);
  //     return `${day}-${month}-${year}`;
  //   } else {
  //     const date = new Date(dateTime);
  //     const day = String(date.getDate());
  //     const month = monthNames[date.getMonth()];
  //     const year = String(date.getFullYear());
  //     return `${day}-${month}-${year}`;
  //   }
  // };

  const handleAssignTa = (values: any) => {
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
              assignTa(values)
                .then(() => {
                  // form.resetFields();
                  router.refresh();
                })
                .catch((e) => console.log('Error assigning TA: ', e));
            }, 2000);
          }).catch((e) => console.log('Error assigning TA: ', e));
        },
        onCancel() {
          router.refresh();
        },
      });

      // assignTa('assignTa', values.requestNo, values.taId);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {contextHolder}

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="a1" role="tabpanel">
          <div className="table-responsive">
            {/* <> */}
            <table className="table job-alert-table w-100">
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
                {fpkData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{index + 1 + offset}</td>
                      <td>
                        <b>{`${data?.jobTitleName ?? '-'}`}</b>
                        <br />
                        {`${data?.requestNo ?? '-'}`}
                      </td>
                      <td>{`${data?.jobLvlCode ?? '-'}`}</td>
                      <td>{`${data?.compCode ?? '-'}`}</td>
                      {/* <td>{`${data?.InitiatorName ?? ''}\n${data.InitiatorEmail ?? ''}`}</td> */}
                      {/* <td>{`${data?.LocationName ?? ''}`}</td> */}
                      {/* <td>{`${data?.Reason ?? ''}`}</td> */}
                      {/* <td>{`${convertDate(data?.CreateDate ?? '')}`}</td> */}
                      {/* <td>{`${convertDate(data?.ApprovalDate ?? '')}`}</td> */}
                      <td>
                        <b>
                          <span className="approved">{`Fully ${data?.status ?? '-'}`}</span>
                        </b>
                        <br />
                        {`${data?.approvalDate ?? ''}`}
                      </td>
                      {/* <td>{`${data?.CandidateSource ? 'Yes' : 'No'}`}</td> */}
                      <td>
                        <Form
                          // form={form}
                          ref={(el) => (formRef.current[data?.requestNo] = el)}
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
                              onChange={() =>
                                setAssignDisabled((prevState) => ({
                                  ...prevState,
                                  [data?.requestNo]: true,
                                }))
                              }
                              placeholder="Select TA"
                              optionFilterProp="children"
                              // value={data.TaId}
                              filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                              }
                              options={taData?.map((item) => ({
                                value: item.value,
                                label: item.label,
                                disabled: item.value === data?.taId,
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
                                  <b>Email: </b>
                                  {`${data.initiatorEmail ?? '-'}`}
                                </p>
                                <p>
                                  <b>Phone Number: </b>
                                  {`${data.initiatorPhone ?? '-'}`}
                                </p>
                                <p>
                                  <b>Position: </b>
                                  {`${data.initiatorJobTitleName ?? '-'}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Location: </b>
                                  {`${data?.locationName ?? '-'}`}
                                </p>
                                <p>
                                  <b>Create FPK: </b>
                                  {`${data?.createDate ?? ''}`}
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
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {/* </> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployJobFpkItem;
