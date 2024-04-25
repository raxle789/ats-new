import React from 'react';
import Image from 'next/image';
import edit from '@/assets/dashboard/images/icon/icon_20.svg';
import delete_icon from '@/assets/dashboard/images/icon/icon_21.svg';
import { useRouter } from 'next/navigation';

const ActionDropdownJobDetails = () => {
  const router = useRouter();
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a
          className="dropdown-item"
          onClick={() => router.push('/dashboard/ta/preview-page/job-info')}
          style={{ cursor: 'pointer' }}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Info
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </a>
      </li>
    </ul>
  );
};

export default ActionDropdownJobDetails;
