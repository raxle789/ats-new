'use client';
import React, { useState } from 'react';
import SearchBar from '@/ui/search-bar';
import candidate_data from '@/data/candidate-data';
import CandidatesItems from './candidates-items';
// import CandidatesFilter from './candidates-filter';
import { Button, Popover } from 'antd';
import dynamic from 'next/dynamic';

const BlacklistedArea = () => {
  const DynamicFilter = dynamic(() => import('./candidates-filter'));
  const candidate_items = candidate_data.slice(0, 10);
  const [popOverState, setPopOverState] = useState(false);
  const filterButtonClick = () => {
    setPopOverState(!popOverState);
  };
  return (
    <>
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Blacklisted</h2>
        </div>
        <div className="d-flex xs-mt-30 justify-content-end align-items-center">
          <SearchBar />
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
        {candidate_items.map((item) => (
          <CandidatesItems key={item.id} item={item} />
        ))}
      </div>

      {/* <div className="d-flex justify-content-center mt-30">
        <Pagination
          pageRangeDisplayed={3}
          totalData={jobVacancyData?.total}
          disabled={
            !jobVacancyData.data || jobVacancyData?.total <= Number(perPage)
              ? true
              : false
          }
        />
      </div> */}
    </>
  );
};

export default BlacklistedArea;
