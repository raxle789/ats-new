import EmployShortSelect from './short-select';
import React from 'react';
import EmployJobFpkItem from './job-fpk-item';
import SearchBar from '@/ui/search-bar';
import {
  getFpkData,
  searchFpkData,
  getTaData,
  assignTa,
} from '@/lib/actions/fpk/action';
import Pagination from '@/ui/pagination';

// export const fpkData = [
//   {
//     fpkNo: '2024/DCM/160032-01',
//     jobTitle: 'Jr.Associate Principal Management',
//     jobLevel: '3C',
//     companyCode: 'DCM',
//     fpkInisiator: 1,
//     location: 'Jakarta - Erajaya Plaza',
//     statusMpp: 'Replacement',
//     createFpk: '9-Mar-24',
//     fpkFullyApproved: '15-Mar-24',
//     fpkStatus: 'Fully Approved',
//     jobPosting: 'Yes',
//     picTa: -1,
//   },
//   {
//     fpkNo: '2024/DCM/160032-02',
//     jobTitle: 'Jr.Associate Principal Management',
//     jobLevel: '3C',
//     companyCode: 'DCM',
//     fpkInisiator: 2,
//     location: 'Jakarta - Erajaya Plaza',
//     statusMpp: 'Replacement',
//     createFpk: '9-Mar-24',
//     fpkFullyApproved: '15-Mar-24',
//     fpkStatus: 'Fully Approved',
//     jobPosting: 'No',
//     picTa: 2,
//   },
//   {
//     fpkNo: '2024/DCM/160032-03',
//     jobTitle: 'Jr.Associate Principal Management',
//     jobLevel: '3C',
//     companyCode: 'DCM',
//     fpkInisiator: 3,
//     location: 'Jakarta - Erajaya Plaza',
//     statusMpp: 'Replacement',
//     createFpk: '9-Mar-24',
//     fpkFullyApproved: '15-Mar-24',
//     fpkStatus: 'Fully Approved',
//     jobPosting: 'No',
//     picTa: -1,
//   },
//   {
//     fpkNo: '2024/DCM/160032-04',
//     jobTitle: 'Jr.Associate Principal Management',
//     jobLevel: '3C',
//     companyCode: 'DCM',
//     fpkInisiator: 4,
//     location: 'Jakarta - Erajaya Plaza',
//     statusMpp: 'Replacement',
//     createFpk: '9-Mar-24',
//     fpkFullyApproved: '15-Mar-24',
//     fpkStatus: 'Fully Approved',
//     jobPosting: 'Yes',
//     picTa: 4,
//   },
// ];

interface EmployJobFpkProps {
  searchParams: any;
}

const EmployJobFpk: React.FC<EmployJobFpkProps> = async ({ searchParams }) => {
  const page = searchParams?.page ?? '1';

  const perPage = searchParams?.perPage ?? '10';

  const searchQuery = searchParams?.query ?? '';

  const offset = (Number(page) - 1) * Number(perPage);

  const fpkData = await (async () => {
    if (searchQuery) {
      return await searchFpkData(searchQuery, offset, Number(perPage))
        .then((res) => {
          const data = res?.data ?? [];

          const total = res?.total ?? 0;

          return {
            data: data,
            total: total,
          };
        })
        .catch((e) => {
          console.log('Failed Searching FPK Data: ', e);

          return {
            data: [],
            total: 0,
          };
        });
    } else {
      // setOffset((Number(page) - 1) * Number(perPage));

      return await getFpkData(offset, Number(perPage))
        .then((res) => {
          const data = res?.data ?? [];

          const total = res?.total ?? 0;

          return {
            data: data,
            total: total,
          };
        })
        .catch((e) => {
          console.log('Failed Getting FPK Data: ', e);

          return {
            data: [],
            total: 0,
          };
        });

      // getFpkTotal('fpkTotal').then((res) => {
      //   setFpkTotal(res[0].total);
      // });
    }
  })();

  const taData = await getTaData()
    .then((res) => {
      const data = res ?? [];

      return data;
    })
    .catch((e) => {
      console.log('Failed Getting TA Data: ', e);

      return [];
    });

  return (
    <>
      {/* {contextHolder} */}

      {/* <div className="job-fpk-header d-sm-flex flex-wrap align-items-center justify-content-between mb-40 lg-mb-30">
        <h2 className="main-title m0 flex-grow-1">FPK</h2>
        <div className="d-flex ms-auto xs-mt-30 justify-content-between align-items-center">
          <SearchBar />
          <div className="short-filter d-flex align-items-center ms-3">
            <div className="text-dark fw-500 me-2">Filter by:</div>
            <EmployShortSelect />
          </div>
        </div>
      </div> */}

      <div className="bg-white card-box border-20">
        <EmployJobFpkItem
          fpkData={fpkData}
          offset={offset}
          taData={taData}
          assignTa={assignTa}
          perPage={perPage}
        />
      </div>

      {/* <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={fpkData?.total}
          disabled={
            !fpkData || fpkData?.total <= Number(perPage) ? true : false
          }
        />
      </div> */}
    </>
  );
};

export default EmployJobFpk;
