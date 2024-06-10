import React from 'react';
import { Button, Tooltip } from 'antd';
import { LuSend } from 'react-icons/lu';

type Props = {
  buttonDisabled?: {
    [key: string]: boolean;
  };
  handleResendEmail?: any;
  candidateInterviewValue?: number;
  nik?: string;
};

const ActionResendInterview: React.FC<Props> = ({
  buttonDisabled,
  handleResendEmail,
  candidateInterviewValue,
  nik,
}) => {
  return (
    <>
      <Tooltip
        placement="top"
        title={'Resend Interview Invitation'}
        arrow={true}
      >
        <Button
          className="d-flex align-items-center justify-content-center"
          disabled={buttonDisabled && buttonDisabled[`interviewer${nik}`]}
          onClick={() =>
            handleResendEmail('interviewer', candidateInterviewValue, nik)
          }
        >
          <LuSend
            style={{
              color: '#0c1d5c',
              fontSize: '15px',
            }}
          />
        </Button>
      </Tooltip>
    </>
  );
};

export default ActionResendInterview;
