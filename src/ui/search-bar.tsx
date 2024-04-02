'use client';

import Image from 'next/image';
import search from '@/assets/dashboard/images/icon/icon_10.svg';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const perPage = searchParams.get('perPage')?.toString() ?? '10';

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('page', '1');

      params.set('perPage', perPage);

      params.set('query', value);
    } else {
      params.set('page', '1');

      params.set('perPage', perPage);

      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search here.."
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
