'use client';
import { Input, Form, DatePicker, message } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    message.success('Successful');
    router.push('/dashboard/user/stages');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <section className="registration-section position-relative pt-50 lg-pt-80 pb-50 lg-pb-80">
      <div className="container">
        <div className="user-data-form user-register-form">
          <div>
            <h2 className="text-center login-title">Create Account</h2>
          </div>
          <div className="form-wrapper m-auto register-wrapper">
            <div className="tab-content mt-40">
              <Form
                name="form1"
                variant="filled"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Full Name (as per ID/Passport)*</label>
                      <Form.Item<FieldType>
                        name="fullname"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your fullname!',
                          },
                        ]}
                      >
                        <Input placeholder="Your Full Name" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Email*</label>
                      <Form.Item<FieldType>
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input placeholder="Your Email" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Phone Number*</label>
                      <Form.Item<FieldType>
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your phone number!',
                          },
                        ]}
                      >
                        <Input placeholder="Your Phone Number" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Date of Birth*</label>
                      <Form.Item<FieldType>
                        name="dateOfBirth"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your date of birth!',
                          },
                        ]}
                      >
                        <DatePicker
                          className="w-100"
                          onChange={onChange}
                          placeholder="Select Date"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Password*</label>
                      <Form.Item<FieldType>
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-group-meta position-relative mb-15">
                      <label>Confirm Password*</label>
                      <Form.Item<FieldType>
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                        ]}
                      >
                        <Input.Password placeholder="Confirm Your Password" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-12 mb-20">
                    <button
                      type="submit"
                      className="btn-eleven fw-500 tran3s d-block mt-10 btn-login btn-next"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
