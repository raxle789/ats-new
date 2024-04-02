'use client';

import React from 'react';
// import DashboardHeader from '../candidate/dashboard-header';
import EmployJobParameter from './job-parameter-item';
import EmployShortSelect from './short-select';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Pagination from '@/ui/pagination';
// import Image from 'next/image';
// import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useDebouncedCallback } from 'use-debounce';
import SearchBar from '@/ui/search-bar';
import { ExpendableButton } from './expendable-button';

const parameterData = [
  {
    parameterId: 1,
    parameterName: 'Parameter 1',
    minimumYearOfExperienceParameter: 4,
    educationLevelParameter: 'S1 - S2',
    majorOfStudiesParameter: 'Ayam Goreng, Ayam Bakar, Tahu Goreng, Ayam Rebus',
    gradeParameter: '3.98 - 4.00',
    specialSkillParameter: 'Security, Data, Cyber, Analysis',
    certificationsParameter: 'Analysis, Cyber, Data, Security',
    salaryRangeParameter: '2.000.000 - 4.000.000',
    domicileParameter: 'Jawa Tengah, Jawa Barat, Jawa Timur, Bekasi',
    maximumAgeParameter: 24,
    genderParameter: '',
    religionParameter: '',
    raceParameter: '',
    lineIndustryParameter: true,
    jobFunctionParameter: '',
    positionLevelParameter: true,
  },
  {
    parameterId: 2,
    parameterName: 'Parameter 2',
    minimumYearOfExperienceParameter: 4,
    educationLevelParameter: 'S1 - S3',
    majorOfStudiesParameter: 'Ayam Goreng, Ayam Bakar, Tahu Goreng, Ayam Rebus',
    gradeParameter: '3.98 - 4.00',
    specialSkillParameter: 'Security, Data, Cyber, Analysis',
    certificationsParameter: 'Analysis, Cyber, Data, Security',
    salaryRangeParameter: '3.000.000 - 4.000.000',
    domicileParameter: 'Jawa Tengah, Jawa Barat, Jawa Timur, Bekasi',
    maximumAgeParameter: 24,
    genderParameter: '',
    religionParameter: '',
    raceParameter: '',
    lineIndustryParameter: true,
    jobFunctionParameter: true,
    positionLevelParameter: '',
  },
  {
    parameterId: 3,
    parameterName: 'Parameter 3',
    minimumYearOfExperienceParameter: 8,
    educationLevelParameter: 'S1 - S2',
    majorOfStudiesParameter: 'Ayam Goreng, Ayam Bakar, Tahu Goreng, Ayam Rebus',
    gradeParameter: '3.98 - 4.00',
    specialSkillParameter: 'Security, Data, Cyber, Analysis',
    certificationsParameter: 'Analysis, Cyber, Data, Security',
    salaryRangeParameter: '12.000.000 - 14.000.000',
    domicileParameter: 'Jawa Tengah, Jawa Barat, Jawa Timur, Bekasi',
    maximumAgeParameter: 28,
    genderParameter: '',
    religionParameter: '',
    raceParameter: '',
    lineIndustryParameter: '',
    jobFunctionParameter: true,
    positionLevelParameter: true,
  },
  {
    parameterId: 4,
    parameterName: 'Parameter 4',
    minimumYearOfExperienceParameter: 12,
    educationLevelParameter: 'S1 - S2',
    majorOfStudiesParameter: 'Ayam Goreng, Ayam Bakar, Tahu Goreng, Ayam Rebus',
    gradeParameter: '3.98 - 4.00',
    specialSkillParameter: 'Security, Data, Cyber, Analysis',
    certificationsParameter: 'Analysis, Cyber, Data, Security',
    salaryRangeParameter: '2.000.000 - 4.000.000',
    domicileParameter: 'Jawa Tengah, Jawa Barat, Jawa Timur, Bekasi',
    maximumAgeParameter: 24,
    genderParameter: '',
    religionParameter: '',
    raceParameter: '',
    lineIndustryParameter: '',
    jobFunctionParameter: true,
    positionLevelParameter: true,
  },
];

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployParameterArea = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('perPage') ?? '2';
  let offset = 0;

  let newParameterData = [];
  const searchQuery = searchParams.get('query') ?? '';
  const router = useRouter();
  const pathname = usePathname();

  if (searchQuery) {
    offset = 0;
    newParameterData = parameterData.filter((data) => {
      return data.parameterName.includes(searchQuery);
    });
  } else {
    offset = (Number(page) - 1) * Number(perPage);
    newParameterData = parameterData.slice(offset, offset + Number(perPage));
  }

  const handleParameterSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      {/* header start */}
      {/* <DashboardHeader /> */}
      {/* header end */}

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">
          Position Level Requirement
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
        <EmployJobParameter parameterData={parameterData} />
      </div>

      <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={parameterData.length}
          disabled={searchQuery ? true : false}
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
