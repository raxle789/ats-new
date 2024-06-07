'use client';

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { message } from 'antd';
import type { TabsProps } from 'antd';
import PersonalDataForm from '../../forms/personal-data-form';
import BackgroundExperienceForm from '../../forms/background-experience-form';
import DocumentForm from '../../forms/doc-form';
import EducationSkillsForm from '../../forms/education-skills-form';
import AdditionalInformationForm from '../../forms/additional-information-form';
import { fetchCities, fetchCountries, fetchEthnicity, fetchSources } from '@/libs/Fetch';
import { fetchJobFunctions, jobJobLevels, lineIndutries } from '@/libs/Fetch';
import {
  fetchCertificates,
  fetchEducatioMajors,
  fetchEducationInstitutios,
  fetchEducationLevels,
  fetchSkills,
} from '@/libs/Fetch';
import { getCandidateProfile } from '@/libs/Candidate/retrieve-data';
import { getCandidateExperiences } from '@/libs/Candidate/retrieve-data';
import { getEducationSkills } from '@/libs/Candidate/retrieve-data';
import { getAdditionalInformations } from '@/libs/Candidate/retrieve-data';

export type MasterData = {
  citys?: {
    value: string;
    label: string;
  }[];
  ethnicity?: {
    value: string;
    label: string;
  }[];
  countries?: {
    value: string;
    label: string;
  }[];
  job_levels?: {
    value: number;
    label: string;
  }[];
  job_functions?: {
    value: number;
    label: string;
  }[];
  line_industries?: {
    value: number;
    label: string;
  }[];
  education_levels?: {
    value: string;
    label: string;
  }[];
  education_majors?: {
    value: string;
    label: string;
  }[];
  education_institutions?: {
    value: string;
    label: string;
  }[];
  certificates_name?: {
    value: number;
    label: string;
  }[];
  skills?: {
    value: number;
    label: string;
  }[];
  sources?: {
    value: number;
    label: string;
  }[];
};

const DashboardProfileArea = () => {
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
  const [keyState, setKeyState] = useState('1');
  /* Master Data */
  const [masterData, setMasterData] = useState<MasterData | null>(null);
  const [profileData, setProfileData] = useState<any | null>(null);
  const [experiences, setExperiences] = useState<any | null>(null);
  const [educationAndSkill, setEducationAndSkill] = useState<any>(null);
  const [additionalInformation, setAdditionalInformation] = useState<any>(null);
  const [source, setSource] = useState<{id?: number; name: string;} | null>(null);
  const [noticePeriod, setNoticePeriod] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  /* Fetch Form Data */
  const fetchProfileData = async () => {
    const profileData = await getCandidateProfile();
    console.log('client:profile-data -> ', profileData);
    if (!profileData.success) {
      return setErrors(profileData.message);
    }
    return setProfileData(profileData.data);
  };

  const fetchExperiences = async () => {
    const experiencesData = await getCandidateExperiences();
    console.log('client:experiences-data -> ', experiences);
    if (!experiencesData.success) {
      return message.error(experiencesData.message);
    }
    return setExperiences(experiencesData.data);
  };

  const fetchEducationSkills = async () => {
    const educationSkillsData = await getEducationSkills();
    console.log('client:education-data -> ', educationAndSkill);
    if (!educationSkillsData.success) {
      return message.error(educationSkillsData.message);
    }
    return setEducationAndSkill(educationSkillsData.data);
  };

  const fetchAdditionalInformations = async () => {
    const additionalInformationsData = await getAdditionalInformations();
    console.log('client:additional-data -> ', additionalInformation);
    if (!additionalInformationsData.success) {
      return message.error(additionalInformationsData.message);
    }
    return setAdditionalInformation(additionalInformationsData.data);
  };

  const fetchData = async () => {
    await Promise.all([
      fetchCities(setMasterData),
      fetchEthnicity(setMasterData),
      fetchCountries(setMasterData),
      fetchJobFunctions(setMasterData),
      jobJobLevels(setMasterData),
      lineIndutries(setMasterData),
      fetchEducationLevels(setMasterData),
      fetchEducatioMajors(setMasterData),
      fetchEducationInstitutios(setMasterData),
      fetchCertificates(setMasterData),
      fetchSkills(setMasterData),
      fetchSources(setMasterData)
    ]);
  };

  const onChange = (key: string) => {
    setKeyState(key);
  };

  useEffect(() => {
    /* Candidate Data */
    fetchProfileData();
    fetchExperiences();
    fetchEducationSkills();
    fetchAdditionalInformations();

    /* Master data */
    fetchData();
  }, []);

  useEffect(() => {
    if (additionalInformation) {
      setNoticePeriod(additionalInformation?.candidate_questions[0]?.answer);
    }
  }, [additionalInformation]);

  useEffect(() => {
    if (profileData) {
      setSource({ id: profileData?.sourceId, name: profileData?.sources });
    }
  }, [profileData]);

  useEffect(() => {
    console.log('useEffect:profile-data -> ', profileData);
  }, [experiences]);
  useEffect(() => {
    console.log('useEffect:experiences-data -> ', experiences);
  }, [experiences]);
  useEffect(() => {
    console.log('useEffect:education-data -> ', educationAndSkill);
  }, [experiences]);
  useEffect(() => {
    console.log('useEffect:additional-data -> ', additionalInformation);
  }, [experiences]);
  return (
    <>
      <h2 className="main-title">My Profile</h2>

      <div className="bg-white card-box border-20">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        {keyState === '1' && (
          <PersonalDataForm
            profileData={profileData}
            masterData={masterData}
            errors={errors}
          />
        )}
        {keyState === '2' && (
          <BackgroundExperienceForm
            experiences={experiences}
            masterData={masterData}
            noticePeriod={noticePeriod}
            errors={errors}
          />
        )}
        {keyState === '3' && (
          <EducationSkillsForm
            educationAndSkill={educationAndSkill}
            masterData={masterData}
            errors={errors}
          />
        )}
        {keyState === '4' && (
          <AdditionalInformationForm
            additionalInformation={additionalInformation}
            source={source}
            masterData={masterData}
            errors={errors}
          />
        )}
        {keyState === '5' && <DocumentForm />}
      </div>
    </>
  );
};

export default DashboardProfileArea;
