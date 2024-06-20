'use client';

import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import React, { SetStateAction } from 'react';

const SearchBar = ({ current, setCurrent } : { current: number, setCurrent: React.Dispatch<SetStateAction<number>> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if(current >= 1) {
      params.set('page', String(1))
      setCurrent(1);
    };
    if(value) {
      params.set('search', value);
      router.replace(pathname + '?' + params.toString());
    } else {
      params.delete('search');
      router.replace(pathname + '?' + params.toString())
    };
  }, 1000);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search here.."
          defaultValue={searchParams.get('query') ?? ''}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="submit">
          <Image src={search} alt="search" className="lazy-img m-auto" />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
