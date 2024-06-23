'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from '@/ui/search-bar';
import CandidatesItems from './candidates-items';
import CardsSkeleton from '@/ui/cards-skeleton';
// import CandidatesFilter from './candidates-filter';
import { Button, Pagination, PaginationProps, Popover } from 'antd';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CandidatesArea = () => {
  const DynamicFilter = dynamic(() => import('./candidates-filter'));
  const [popOverState, setPopOverState] = useState(false);
  const filterButtonClick = () => {
    setPopOverState(!popOverState);
  };

  const _ROUTER = useRouter();
  const _PATHNAME = usePathname();
  const searchParams = useSearchParams();
  let _CURRENTPAGE = searchParams.get('page'); // string Number
  let _SEARCHTEXT = searchParams.get('search') ?? '';
  const [current, setCurrent] = useState<number>(Number(_CURRENTPAGE) ?? 0);
  const [candidateList, setCandidateList] = useState<any>(null);

  const fetchCandidates = async () => {
    const request = await fetch(
      '/api/v1/talent-acq/candidates?page=' +
        current +
        '&search=' +
        _SEARCHTEXT,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await request.json();
    /* Candidate List State */
    setCandidateList(response.data);
  };
  /* Change number of pagination */
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    _ROUTER.push(_PATHNAME + '?' + params.toString());
  };

  useEffect(() => {
    fetchCandidates();
  }, [current, _SEARCHTEXT]);
  return (
    <>
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Candidates</h2>
        </div>
        <div className="d-flex xs-mt-30 justify-content-end align-items-center">
          {/* Search Bar */}
          <SearchBar current={current} setCurrent={setCurrent} />
          <div className="short-filter d-flex align-items-center ms-3">
            {/* <div className="popover-filter"> */}
            <Popover
              placement="bottom"
              // title={text}
              content={<DynamicFilter />}
              open={popOverState}
              // style={{ width: '400px' }}
            >
              <Button type="primary" onClick={filterButtonClick}>
                Filter by
              </Button>
            </Popover>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="wrapper">
        {candidateList === null && <CardsSkeleton />}
        {candidateList &&
          candidateList !== null &&
          candidateList.candidates?.map((candidate: any, index: number) => (
            <CandidatesItems key={index} candidates={candidate} />
          ))}
      </div>
      {/* Pagination */}
      <Pagination
        onChange={onChange}
        defaultCurrent={current}
        current={current}
        total={candidateList?.count}
      />
    </>
  );
};

export default CandidatesArea;
