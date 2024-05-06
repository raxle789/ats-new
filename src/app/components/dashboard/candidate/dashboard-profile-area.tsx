'use client';
import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PersonalDataForm from '../../forms/personal-data-form';
import BackgroundExperienceForm from '../../forms/background-experience-form';
import DocumentForm from '../../forms/doc-form';

const DashboardProfileArea = () => {
  const [keyState, setKeyState] = useState('');

  const onChange = (key: string) => {
    console.log(key);
    setKeyState(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Personal Data',
    },
    {
      key: '2',
      label: 'Background Experience',
    },
    {
      key: '3',
      label: 'Documents',
    },
  ];
  return (
    <>
      <h2 className="main-title">My Profile</h2>

      <div className="bg-white card-box border-20">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {keyState === '1' && <PersonalDataForm />}
        {keyState === '2' && <BackgroundExperienceForm />}
        {keyState === '3' && <DocumentForm />}
      </div>
    </>
  );
};

export default DashboardProfileArea;
