'use client';
import React from 'react';
import NiceSelect from '@/ui/nice-select';

const EmployShortSelect = () => {
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: 'Newest', label: 'Newest' },
        { value: 'Name', label: 'Pending' },
        { value: 'Oldest', label: 'Oldest' },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleShort(item)}
      name="Short by"
    />
  );
};

export default EmployShortSelect;
