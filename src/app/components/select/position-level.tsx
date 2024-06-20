import React from 'react';
import slugify from 'slugify';
import job_data from '@/data/job-data';
import NiceSelect from '@/ui/nice-select';

// file ini sebelumnya job location select
const PositionLevelSelect = ({
  setLocationVal,
}: {
  setLocationVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const positionLevel = [...new Set(job_data.map((job) => job.positionLevel))];
  // location_option
  // const level_option = positionLevel.map((l) => {
  //   return {
  //     value: slugify(l.split(',').join('-').toLowerCase(), '-'),
  //     label: l,
  //   };
  // });
  const handleLocation = (item: { value: string; label: string }) => {
    setLocationVal(item.value);
  };
  return (
    <NiceSelect
      options={[
        {
          value: 'Staff',
          label: 'Staff',
        },
        {
          value: 'Supervisor',
          label: 'Supervisor',
        },
        {
          value: 'Assistant Manager',
          label: 'Assistant Manager',
        },
        {
          value: 'Manager',
          label: 'Manager',
        },
        {
          value: 'General Manager',
          label: 'General Manager',
        },
        {
          value: 'Director',
          label: 'Director',
        },
        {
          value: 'VP',
          label: 'VP',
        },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="looking for"
      cls="location"
    />
  );
};

export default PositionLevelSelect;
