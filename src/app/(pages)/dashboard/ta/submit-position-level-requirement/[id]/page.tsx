import React from 'react';
import SubmitPositionLevelRequirementArea from '@/app/components/dashboard/employ/submit-position-level-requirement-area';

export const revalidate = 0;

type IProps = {
  params: any;
};

const SubmitPositionLevelRequirementPage: React.FC<IProps> = ({ params }) => {
  return <SubmitPositionLevelRequirementArea params={params} />;
};

export default SubmitPositionLevelRequirementPage;
