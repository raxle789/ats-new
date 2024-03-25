'use client';

import React from 'react';
import DashboardHeader from '../candidate/dashboard-header';
import EmployJobParameter from './job-parameter-item';
import EmployShortSelect from './short-select';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Pagination from '@/ui/pagination';
import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useDebouncedCallback } from 'use-debounce';

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

      {/* <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0">My Jobs</h2>
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
      </div> */}

      <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">Jobs</h2>
        <div className="d-flex flex-grow-1 ms-auto xs-mt-30 justify-content-between align-items-center">
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <input
              type="text"
              placeholder="Search here.."
              onChange={(e) => handleParameterSearch(e.target.value)}
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
              <table className="table job-alert-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Parameter Name</th>
                    <th scope="col">More</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {newParameterData.map((data, index) => {
                    return (
                      <EmployJobParameter
                        key={data.parameterId}
                        parameterIndex={index + Number(offset)}
                        parameterName={data.parameterName}
                        minimumYearOfExperienceParameter={
                          data.minimumYearOfExperienceParameter
                        }
                        educationLevelParameter={data.educationLevelParameter}
                        majorOfStudiesParameter={data.majorOfStudiesParameter}
                        gradeParameter={data.gradeParameter}
                        specialSkillParameter={data.specialSkillParameter}
                        certificationsParameter={data.certificationsParameter}
                        salaryRangeParameter={data.salaryRangeParameter}
                        domicileParameter={data.domicileParameter}
                        maximumAgeParameter={data.maximumAgeParameter}
                        genderParameter={data.genderParameter}
                        religionParameter={data.religionParameter}
                        raceParameter={data.raceParameter}
                        lineIndustryParameter={data.lineIndustryParameter}
                        jobFunctionParameter={data.jobFunctionParameter}
                        positionLevelParameter={data.positionLevelParameter}
                      />
                    );
                  })}

                  {/* <EmployJobItem
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
                  /> */}
                </tbody>
              </table>
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
