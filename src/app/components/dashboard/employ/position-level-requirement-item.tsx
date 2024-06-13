'use client';

import React from 'react';
import SpinFullScreen from '@/ui/spin-full-screen';
import { useRouter } from 'next/navigation';
import * as messages from '@/utils/message';
import * as confirmations from '@/utils/confirmation';
import _ from 'lodash';
import Pagination from '@/ui/pagination';
import EmployShortSelect from './short-select';
import SearchBar from '@/ui/search-bar';
import { Spin, Modal } from 'antd';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import ActionDropdown from '../candidate/action-dropdown';
import { useState, useEffect } from 'react';
import { ExpendableButton } from './expendable-button';

const { confirm } = Modal;

type Props = {
  positionLevelRequirementData: [];
};

const PositionLevelRequirementItem = ({
  positionLevelRequirementData,
  perPage,
}) => {
  const router = useRouter();

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {},
  );
  // const key: any = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [loading, setLoading] = React.useState(false);

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

  function handlePositionLevelRequirement(handleType: 'edit', positionLevelId) {
    setLoading(true);

    if (handleType === 'edit') {
      confirm({
        ...confirmations?.editConfirmation('positionLevelRequirement'),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              resolve(
                router.push(
                  `/dashboard/ta/submit-position-level-requirement/${positionLevelId}`,
                ),
              );
            }, 2000);
          }).catch((e) =>
            console.log("Error Setting Position's Level Requirement: ", e),
          );
        },
        onCancel() {
          router.refresh();

          setLoading(false);
        },
      });
    }
  }

  // const showLoader = () => {
  //   setLoading(true);
  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 3000);
  // };

  return (
    <>
      <SpinFullScreen loading={loading} />

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">
          Position Level Requirements
        </h2>
        <div className="d-flex xs-mt-30 justify-content-between align-items-center">
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
                  <th scope="col" style={{ width: '136.66px' }}>
                    No
                  </th>
                  <th scope="col" style={{ width: '438.63px' }}>
                    Parameter Name
                  </th>
                  <th scope="col">More</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {positionLevelRequirementData?.data?.map(
                  (data: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{`${index + 1 ?? ''}`}</td>
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
                              href="#"
                              // query: {
                              //   '': CryptoJS.Rabbit.encrypt(
                              //     String(data.id),
                              //     process.env.NEXT_PUBLIC_SECRET_KEY,
                              //   ).toString(),
                              // },

                              onClick={() =>
                                handlePositionLevelRequirement('edit', data?.id)
                              }
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
                                  (d: any, index: number) => {
                                    return (
                                      <div key={index} className="col-lg-6">
                                        <p>
                                          <b>{`${d?.requirementFields?.name}: `}</b>
                                          {/* <b>{`${subTitle[d?.requirementFields?.name ?? '']}: `}</b> */}
                                          {d?.value ?? '-'}
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
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={positionLevelRequirementData?.total}
          disabled={
            !positionLevelRequirementData ||
            positionLevelRequirementData?.total <= Number(perPage)
              ? true
              : false
          }
        />
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

export default PositionLevelRequirementItem;
