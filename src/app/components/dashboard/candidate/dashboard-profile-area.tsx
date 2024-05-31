'use client';

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PersonalDataForm from '../../forms/personal-data-form';
import BackgroundExperienceForm from '../../forms/background-experience-form';
import DocumentForm from '../../forms/doc-form';
import EducationSkillsForm from '../../forms/education-skills-form';
import AdditionalInformationForm from '../../forms/additional-information-form';
/* PDF Reader */
import { pdfjs } from 'react-pdf';

const DashboardProfileArea = () => {
  const [keyState, setKeyState] = useState('1');

  const onChange = (key: string) => {
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
      label: 'Education & Skills',
    },
    {
      key: '4',
      label: 'Additional Information',
    },
    {
      key: '5',
      label: 'Documents',
    },
  ];

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url
    ).toString();

  }, []);

  return (
    <>
      <h2 className="main-title">My Profile</h2>

      <div className="bg-white card-box border-20">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {keyState === '1' && <PersonalDataForm />}
        {keyState === '2' && <BackgroundExperienceForm />}
        {keyState === '3' && <EducationSkillsForm />}
        {keyState === '4' && <AdditionalInformationForm />}
        {keyState === '5' && <DocumentForm />}
      </div>
    </>
  );
};

export default DashboardProfileArea;
