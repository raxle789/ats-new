'use client';

import FilterArea from './filter-area';
import { useState } from 'react';
import job_data from '@/data/job-data';

const JobFilter = () => {
  const maxPrice = job_data.reduce((max, job) => {
    return job.salary > max ? job.salary : max;
  }, 0);

  const [priceValue, setPriceValue] = useState([0, maxPrice]);

  return (
    <div className="col-xl-3 col-lg-4">
      <button
        type="button"
        className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
        data-bs-toggle="offcanvas"
        data-bs-target="#filteroffcanvas"
      >
        <i className="bi bi-funnel"></i>
        Filter
      </button>
      {/* filter area start */}
      <FilterArea
        priceValue={priceValue}
        setPriceValue={setPriceValue}
        maxPrice={maxPrice}
      />
      {/* filter area end */}
    </div>
  );
};

export default JobFilter;
