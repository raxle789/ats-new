'use client';

import Image from 'next/image';
import React from 'react';
import ReactPaginate from 'react-paginate';
import icon from '@/assets/images/icon/icon_50.svg';
import icon_2 from '@/assets/images/icon/icon_69.svg';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fpkData } from '@/app/components/dashboard/employ/job-fpk';

// prop type
// type IProps = {
//   page: string;
//   perPage: string;
// };

const Pagination = ({ disabled }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  // const page = searchParams.get('page') ?? '1';

  const perPage = searchParams.get('perPage') ?? '2';

  function handleClick({ selected }) {
    const params = new URLSearchParams(searchParams);

    if (selected) {
      params.set('page', selected + 1);

      params.set('perPage', perPage);
    } else {
      params.delete('page');

      params.delete('perPage');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <ReactPaginate
      className={`pagination-one d-flex align-items-center justify-content-center style-none ${disabled ? 'd-none' : ''}`}
      breakLabel="..."
      activeClassName="active"
      nextLabel={
        <span className="d-flex align-items-center">
          <Image src={icon} alt="icon" className="ms-2" />
        </span>
      }
      onPageChange={handleClick}
      pageRangeDisplayed={3}
      pageCount={Math.ceil(fpkData.length / Number(perPage))}
      previousLabel={
        <span className="d-flex align-items-center">
          <Image src={icon_2} className="me-2" alt="icon" />
        </span>
      }
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
