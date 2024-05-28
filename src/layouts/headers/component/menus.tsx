import React, { useEffect, useState } from 'react';
import menu_data from '@/data/menu-data';
import Link from 'next/link';

const Menus = () => {
  const [scrollDistance2, setScrollDistance2] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollDistance2(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {menu_data.map((menu) => (
        <li key={menu.id} className="nav-item">
          <Link
            className={`nav-link ${scrollDistance2 > 100 ? 'nav-link-scrolled' : '.nav-link-not-scrolled'}`}
            href={menu.link}
            role="button"
            prefetch={true}
          >
            {menu.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default Menus;
