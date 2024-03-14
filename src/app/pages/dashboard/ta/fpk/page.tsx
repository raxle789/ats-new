'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';
import EmployJobFpk from '@/app/components/dashboard/employ/job-fpk';

const jobFpkPage = () => {
  return <EmployJobFpk />;
};

export default jobFpkPage;
