import React from 'react';
import PositionLevelRequirementArea from '@/app/components/dashboard/employ/position-level-requirement-area';
export const revalidate = 0;

const PositionLevelRequirementPage = ({ searchParams }: any) => {
  return <PositionLevelRequirementArea searchParams={searchParams} />;
};

export default PositionLevelRequirementPage;
