'use server';

import React from 'react';
// import DashboardHeader from '../candidate/dashboard-header';
import {
  getAllPositionLevelRequirementData,
  searchPositionLevelRequirementData,
} from '@/lib/action/positionLevelRequirement/action';
import EmployJobParameter from './job-parameter-item';
import EmployShortSelect from './short-select';
import Pagination from '@/ui/pagination';
// import Image from 'next/image';
// import search from '@/assets/dashboard/images/icon/icon_10.svg';
import SearchBar from '@/ui/search-bar';
import { ExpendableButton } from './expendable-button';

const parameterData = [
  {
    parameterId: 1,
    parameterName: 'Parameter 1',
    totalYearOfExperienceParameter: 4,
    educationLevelParameter: 'S1 - S2',
    gradeParameter: '3.98 - 4.00',
    salaryRangeParameter: '2.000.000 - 4.000.000',
    lineIndustryParameter: true,
    jobLevelParameter: true,
  },
  {
    parameterId: 2,
    parameterName: 'Parameter 2',
    totalYearOfExperienceParameter: 4,
    educationLevelParameter: 'S1 - S3',
    gradeParameter: '3.98 - 4.00',
    salaryRangeParameter: '3.000.000 - 4.000.000',
    lineIndustryParameter: true,
    jobLevelParameter: '',
  },
  {
    parameterId: 3,
    parameterName: 'Parameter 3',
    totalYearOfExperienceParameter: 8,
    educationLevelParameter: 'S1 - S2',
    gradeParameter: '3.98 - 4.00',
    salaryRangeParameter: '12.000.000 - 14.000.000',
    lineIndustryParameter: '',
    jobLevelParameter: true,
  },
  {
    parameterId: 4,
    parameterName: 'Parameter 4',
    totalYearOfExperienceParameter: 12,
    educationLevelParameter: 'S1 - S2',
    gradeParameter: '3.98 - 4.00',
    salaryRangeParameter: '2.000.000 - 4.000.000',
    lineIndustryParameter: '',
    jobLevelParameter: true,
  },
];

const EmployParameterArea = async ({ searchParams }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const getData = () => {
    if (searchQuery) {
      return searchPositionLevelRequirementData(searchQuery, offset, perPage)
        .then((res) => {
          const data = res?.data ?? [];

          const total = res?.total ? res?.total : 0;

          return {
            data: data,
            total: total,
          };
        })
        .catch((e) =>
          console.log('Error searching position level requirements: ', e),
        );
    } else {
      return getAllPositionLevelRequirementData(offset, Number(perPage))
        .then((res) => {
          const data = res?.data ?? [];

          const total = res?.total ? res?.total : 0;

          return {
            data: data,
            total: total,
          };
        })
        .catch((e) =>
          console.log('Error getting position level requirements: ', e),
        );
    }
  };

  // if (searchQuery) {
  //   offset = 0;
  //   newParameterData = parameterData.filter((data) => {
  //     return data.parameterName.includes(searchQuery);
  //   });
  // } else {
  //   offset = (Number(page) - 1) * Number(perPage);
  //   newParameterData = parameterData.slice(offset, offset + Number(perPage));
  // }

  // const handleParameterSearch = useDebouncedCallback((value) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (value) {
  //     params.set('query', value);
  //   } else {
  //     params.delete('query');
  //   }
  //   router.replace(`${pathname}?${params.toString()}`);
  // }, 500);

  const positionLevelRequirementData = await getData();

  // const userData = await getUserData();

  // console.info(userData);

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}

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

      <div className="bg-white card-box border-20">
        <EmployJobParameter
          positionLevelRequirementData={positionLevelRequirementData?.data}
        />
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

export default EmployParameterArea;
