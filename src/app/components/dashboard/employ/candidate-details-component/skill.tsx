import React from 'react';

type Props = {
  skillData?: any;
};

const Skill: React.FC<Props> = ({ skillData }) => {
  return (
    <>
      {(skillData?.length === 0 || skillData === null) && <div>No data</div>}
      {skillData !== null &&
        skillData?.map((item: any, index: number) => (
          <div key={index}>
            <p className="mb-0">{item}</p>
          </div>
        ))}
    </>
  );
};

export default Skill;
