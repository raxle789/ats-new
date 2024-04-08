'use client';

import React from 'react';
import { Spin } from 'antd';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import ActionDropdown from '../candidate/action-dropdown';
import { useState, useEffect } from 'react';
import { ExpendableButton } from './expendable-button';

const _ = require('lodash');

type TSubTitle = {
  education_level: string;
  job_level: string;
  min_year_experience: string;
  grade: string;
  line_industry: string;
  salary: string;
};

const subTitle: TSubTitle = {
  education_level: 'Education Level',
  job_level: 'Job Level',
  min_year_experience: 'Min Year Experience',
  grade: 'Grade',
  line_industry: 'Line Industry',
  salary: 'Salary',
};

const EmployJobParameter = ({
  positionLevelRequirementData,
  getLineIndustryData,
  getEducationLevelData,
  getPositionLevelData,
}) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );

  // console.info(positionLevelRequirementData);

  // const [positionLevelRequirement, setPositionLevelRequirement] = useState([]);

  // function formatFieldName(fieldName) {
  //   const newFieldName = fieldName.split('_').map((word) => {
  //     return word.charAt(0).toUpperCase() + word.slice(1);
  //   });

  //   return newFieldName.join(' ');
  // }

  // async function updatePositionLevelRequirementData() {
  //   // if (!_.isEmpty(positionLevelRequirementData)) {
  //   //   await positionLevelRequirementData.forEach(async (data) => {
  //   //     data.positionLevelRequirements.forEach(async (d) => {
  //   // if (!d.value) {
  //   //   d.value = '-';
  //   // }
  //   // else {
  //   // if (d.requirementFields.name === 'line_industry') {
  //   //   if (d.value && typeof d.value === 'string') {
  //   //     try {
  //   //       const parsedValue = JSON.parse(d.value);
  //   //       const isArray = Array.isArray(parsedValue);
  //   //       if (isArray) {
  //   //         d.value = await getLineIndustryData(parsedValue);
  //   //         // const getData = async () => {
  //   //         //   const newData = await getLineIndustryData(parsedValue);
  //   //         //   d.value = newData.toString();
  //   //         // };
  //   //         // getData();
  //   //       }
  //   //     } catch (e) {
  //   //       console.log(e);
  //   //     }
  //   //   }
  //   // } else if (d.requirementFields.name === 'education_level') {
  //   //   if (d.value && typeof d.value === 'string') {
  //   //     d.value = await getEducationLevelData(Number(d.value));
  //   //     // const getData = async () => {
  //   //     //   const newData = await getEducationLevelData(Number(d.value));
  //   //     //   d.value = newData;
  //   //     // };
  //   //     // getData();
  //   //   }
  //   // } else if (d.requirementFields.name === 'job_level') {
  //   //   if (d.value && typeof d.value === 'string') {
  //   //     d.value = await getPositionLevelData(Number(d.value));
  //   //     // const getData = async () => {
  //   //     //   const newData = await getPositionLevelData(Number(d.value));
  //   //     //   d.value = newData;
  //   //     // };
  //   //     // getData();
  //   //   }
  //   // } else if (d.requirementFields.name === 'salary') {
  //   //   if (d.value && typeof d.value === 'string') {
  //   //     try {
  //   //       const parsedValue = JSON.parse(d.value);
  //   //       const isArray = Array.isArray(parsedValue);
  //   //       if (d.value && isArray && parsedValue.length === 2) {
  //   //         const formatter = new Intl.NumberFormat('id-ID', {
  //   //           style: 'currency',
  //   //           currency: 'IDR',
  //   //         });
  //   //         d.value = `${formatter.format(Number(parsedValue[0]))} - ${formatter.format(Number(parsedValue[1]))}`;
  //   //       }
  //   //     } catch (e) {
  //   //       console.log(e);
  //   //     }
  //   //   }
  //   // }
  //   //     }
  //   //   });
  //   // });
  //   // await positionLevelRequirementData.forEach(async (data) => {
  //   //   data.positionLevelRequirements.forEach(async (d) => {
  //   //     d.requirementFields.name = await formatFieldName(
  //   //       d.requirementFields.name,
  //   //     );
  //   //   });
  //   // });
  //   // }
  // }

  // useEffect(() => {
  //   updatePositionLevelRequirementData();
  // }, [positionLevelRequirementData]);

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    // setTimeout(() => {
    //   setSpinning(false);
    // }, 3000);
  };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="a1" role="tabpanel">
          <div className="table-responsive">
            <table className="table job-alert-table w-100">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Parameter Name</th>
                  <th scope="col">More</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {positionLevelRequirementData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td
                        style={{ width: '136.66px' }}
                      >{`${index + 1 ?? ''}`}</td>
                      {/* <td>{parameterData?.parameterIndex + 1}</td> */}
                      <td>{`${data?.name ?? ''} (Level: ${data?.level})`}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <ExpendableButton
                            isOpen={expandedRows[index]}
                            toggle={() => toggleRowExpansion(index)}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <Link
                            className="edit-container"
                            href={{
                              pathname: `/dashboard/ta/submit-parameter/${encodeURIComponent(
                                CryptoJS.Rabbit.encrypt(
                                  String(data.id),
                                  process.env.NEXT_PUBLIC_SECRET_KEY,
                                ).toString(),
                              )}`,
                              // query: {
                              //   '': CryptoJS.Rabbit.encrypt(
                              //     String(data.id),
                              //     process.env.NEXT_PUBLIC_SECRET_KEY,
                              //   ).toString(),
                              // },
                            }}
                            onClick={showLoader}
                          >
                            <FaEdit className="edit-action" />
                          </Link>
                          {/* <button
                            className="action-btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span></span>
                          </button>
                          <ActionDropdown /> */}
                          {/* <i className="fa-solid fa-trash-can">oke</i> */}
                        </div>
                      </td>
                    </tr>
                    {expandedRows[index] && (
                      <tr>
                        <td></td>
                        <td colSpan={3}>
                          <div
                            className={
                              expandedRows[index]
                                ? 'expanded-row-open'
                                : 'expanded-row-close'
                            }
                          >
                            <div className="row">
                              {data?.positionLevelRequirements?.map(
                                (d, index) => {
                                  return (
                                    <div key={index} className="col-lg-6">
                                      <p>
                                        {/* <b>{`${d?.requirementFields?.name}: `}</b> */}
                                        <b>{`${subTitle[d?.requirementFields?.name ?? '']}: `}</b>
                                        {getPositionLevelRequirementValue(
                                          d.requirementFields.name,
                                          d.value,
                                        )}
                                      </p>
                                    </div>
                                  );
                                },
                              )}
                              {/* <div className="col-6">
                                <p>
                                  <b>Total Year Of Experience: </b>
                                  {`${data?.totalYearOfExperienceParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Education Level: </b>
                                  {`${data?.educationLevelParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Grade: </b>
                                  {`${data?.gradeParameter ?? '-'}`}
                                </p>
                              </div>
                              <div className="col-lg-6">
                                <p>
                                  <b>Salary Range: </b>
                                  {`${data?.salaryRangeParameter ?? '-'}`}
                                </p>
                                <p>
                                  <b>Line Industry: </b>
                                  {`${data?.lineIndustryParameter ? 'Yes' : 'No'}`}
                                </p>
                                <p>
                                  <b>Job Level: </b>
                                  {`${data?.jobLevelParameter ? 'Yes' : 'No'}`}
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployJobParameter;
