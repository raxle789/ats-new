'use server';

import React, { useState, useEffect } from 'react';
import Pagination from '@/ui/pagination';
import { getAllJobVacancyData } from '@/lib/action/job-vacancies/action';
import JobListItem from './job-list-item';
import JobFilter from '../filter/job-filter';
import slugify from 'slugify';
import FilterArea from '../filter/filter-area';
import job_data from '@/data/job-data';
import ListItemTwo from './list-item-2';
import { IJobType } from '@/types/job-data-type';
import JobGridItem from '../grid/job-grid-item';
import { useAppSelector } from '@/redux/hook';
import NiceSelect from '@/ui/nice-select';

const JobList = async ({ searchParams }) => {
  const page = searchParams?.page ?? '1';
  const perPage = searchParams?.perPage ?? '10';
  const searchQuery = searchParams?.query ?? '';
  const offset = (Number(page) - 1) * Number(perPage);

  const jobVacancyData = await getAllJobVacancyData(offset, Number(perPage))
    .then((res) => {
      const data = res?.data ?? [];

      const total = res?.total ?? 0;

      console.info(data);

      return {
        data: data,
        total: total,
      };
    })
    .catch((e) => {
      console.log('Error getting job vacancy data: ', e);
      return {
        data: [],
        total: 0,
      };
    });

  // let all_jobs = job_data;
  // const maxPrice = job_data.reduce((max, job) => {
  //   return job.salary > max ? job.salary : max;
  // }, 0);
  // const { category, experience, job_type, location, tags } = useAppSelector(
  //   (state) => state.filter,
  // );
  // const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
  // const [filterItems, setFilterItems] = useState<IJobType[]>([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const [jobType, setJobType] = useState(grid_style ? 'grid' : 'list');
  // const [priceValue, setPriceValue] = useState([0, maxPrice]);
  // const [shortValue, setShortValue] = useState('');

  // useEffect(() => {
  //   // Filter the job_data array based on the selected filters
  //   let filteredData = all_jobs
  //     .filter((item) =>
  //       category.length !== 0
  //         ? category.some((c) => item.category.includes(c))
  //         : true,
  //     )
  //     .filter((item) =>
  //       experience.length !== 0
  //         ? experience.some(
  //             (e) =>
  //               item.experience.trim().toLowerCase() === e.trim().toLowerCase(),
  //           )
  //         : true,
  //     )
  //     .filter((item) => (job_type ? item.duration === job_type : true))
  //     .filter((l) =>
  //       location
  //         ? slugify(l.location.split(',').join('-').toLowerCase(), '-') ===
  //           location
  //         : true,
  //     )
  //     .filter((item) =>
  //       tags.length !== 0 ? tags.some((t) => item?.tags?.includes(t)) : true,
  //     )
  //     .filter((j) => j.salary >= priceValue[0] && j.salary <= priceValue[1]);

  //   if (shortValue === 'price-low-to-high') {
  //     filteredData = filteredData
  //       .slice()
  //       .sort((a, b) => Number(a.salary) - Number(b.salary));
  //   }

  //   if (shortValue === 'price-high-to-low') {
  //     filteredData = filteredData
  //       .slice()
  //       .sort((a, b) => Number(b.salary) - Number(a.salary));
  //   }
  //   const endOffset = itemOffset + itemsPerPage;
  //   setFilterItems(filteredData);
  //   setCurrentItems(filteredData.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  // }, [
  //   itemOffset,
  //   itemsPerPage,
  //   category,
  //   experience,
  //   job_type,
  //   location,
  //   tags,
  //   all_jobs,
  //   priceValue,
  //   shortValue,
  // ]);

  // const handlePageClick = (event: { selected: number }) => {
  //   const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
  //   setItemOffset(newOffset);
  // };
  // // handleShort
  // const handleShort = (item: { value: string; label: string }) => {
  //   setShortValue(item.value);
  // };
  return (
    <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <JobFilter />
          <JobListItem jobVacancyData={jobVacancyData?.data} />
        </div>
        <div className="d-flex justify-content-center mt-30">
          <Pagination
            pageRangeDisplayed={3}
            totalData={jobVacancyData?.total}
            disabled={
              !jobVacancyData.data || jobVacancyData?.total <= Number(perPage)
                ? true
                : false
            }
          />
        </div>
      </div>
    </section>
  );
};

export default JobList;
