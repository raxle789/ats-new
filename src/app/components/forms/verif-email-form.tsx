import React, { useState } from 'react';
import { Form, Typography } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useAppDispatch } from '@/redux/hook';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';

const { Title } = Typography;

const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string[]>([]); // Since the value will be array of string, the default value of state is empty array.

  const handleFinish = (otp: string[]) => {
    // const payload = otp || value; // Since useState work asynchronously, we shall add the field value from the autoSubmit.
    const payload = otp;
    // Your logic with state
    dispatch(setRegisterStep(3));
  };
  return (
    <Form onFinish={handleFinish}>
      <div className="row">
        <div className="col-12 mb-5">
          <div className="input-group-meta position-relative mb-10">
            <Title level={5}>OTP Code</Title>
            <Form.Item
              name="otpCode"
              rules={[{ required: true, message: 'Please input OTP code!' }]}
            >
              <InputOTP
                onChange={setValue}
                value={value}
                // autoSubmit={handleFinish}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-5 m-auto">
          <button
            type="submit"
            className="dash-btn-two tran3s m-auto"
            // onClick={() => handleFinish}
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
};

export default VerificationForm;
