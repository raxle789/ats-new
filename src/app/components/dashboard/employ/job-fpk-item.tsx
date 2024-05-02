'use client';

import React from 'react';
import Pagination from '@/ui/pagination';
import EmployShortSelect from './short-select';
import SearchBar from '@/ui/search-bar';
import { Button, Spin, Form, Select, Input, Modal, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import { ExpendableButton } from './expendable-button';
const { confirm } = Modal;

// interface FPKItemProps {
//   fpkData: any;
//   offset: number;
//   taData: any;
//   assignTa: any;
// }

const EmployJobFpkItem = ({ fpkData, offset, taData, assignTa, perPage }) => {
  // console.info(fpkData);

  const formRef = useRef({});

  // const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const [assignDisabled, setAssignDisabled] = useState({});
  const router = useRouter();

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

  const [loading, setLoading] = React.useState(false);

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  // const setFormDefaultValue = async () => {
  //   if (fpkData?.data?.length) {
  //     await Promise.all(
  //       fpkData?.data?.map(async (data: any) => {
  //         await formRef.current[data?.requestNo]?.setFieldsValue({
  //           efpkRequestNo: data?.requestNo,
  //           taId: data?.taId,
  //         });
  //       }),
  //     );
  //   }
  // };

  useEffect(() => {
    if (fpkData?.data?.length) {
      fpkData?.data?.map((data: any) => {
        formRef.current[data?.requestNo]?.setFieldsValue({
          efpkRequestNo: data?.requestNo,
          taId: data?.taId,
        });
      });
    }
  }, [fpkData, offset]);

  // function showLoader(show: boolean) {
  //   setLoading(show);
  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 3000);
  // }

  function handleChange(value, requestNo) {
    if (value) {
      setAssignDisabled((prevState) => ({
        ...prevState,
        [requestNo]: true,
      }));
    } else {
      setAssignDisabled((prevState) => ({
        ...prevState,
        [requestNo]: false,
      }));
    }
  }

  function handleAssignTa(values: any) {
    setAssignDisabled((prevState) => ({
      ...prevState,
      [values.efpkRequestNo]: false,
    }));

    setLoading(true);

    // setLoading(true);

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

                  setLoading(false);
                })
                .catch((e: string) => console.log('Error assigning TA: ', e));
            }, 2000);
          }).catch((e) => console.log('Error assigning TA: ', e));
        },
        onCancel() {
          setLoading(false);

          router.refresh();
        },
      });

      // assignTa('assignTa', values.requestNo, values.taId);
      // setLoading(false);
    }, 2000);
  }

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">FPK</h2>
          <div className="d-flex ms-auto xs-mt-30 justify-content-between align-items-center">
            <SearchBar />
            <div className="short-filter d-flex align-items-center ms-3">
              <div className="text-dark fw-500 me-2">Filter by:</div>
              <EmployShortSelect />
            </div>
          </div>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="a1" role="tabpanel">
            <div className="table-responsive">
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
                    <th scope="col">More</th>
                  </tr>
                </thead>
                <tbody>
                  {fpkData?.data?.map((data: any, index: number) => (
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
                        <td>
                          <b>
                            <span
                              // className={`${data?.status === statusColor.approve ? 'approved' : 'not-approved'}`}
                              className={`${data?.status}Color`}
                            >{`${data?.status ?? '-'}`}</span>
                          </b>
                          <br />
                          {`${data?.approvalDate === 'Undefined' ? 'No Date' : data?.approvalDate}`}
                        </td>
                        <td>
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
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-30">
          <Pagination
            pageRangeDisplayed={3}
            totalData={fpkData?.total}
            disabled={
              !fpkData || fpkData?.total <= Number(perPage) ? true : false
            }
          />
        </div>
      </Spin>
    </>
  );
};

export default EmployJobFpkItem;
