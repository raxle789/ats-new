import React from 'react';
import FpkArea from '@/app/components/dashboard/employ/fpk-area';

export const revalidate = 0;

const FpkPage = async ({ searchParams }: any) => {
  return <FpkArea searchParams={searchParams} />;
};

export default FpkPage;
