'use client';
import React, { useEffect, useRef } from 'react';
import { createCandidates } from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import { useState } from 'react';
import { Input, Form, Select, DatePicker, Tabs } from 'antd';
import type { DatePickerProps, FormProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type FieldType = {
  placeOfBirth?: string;
  gender?: string;
  religion?: string;
  ethnicity?: string;
  bloodType?: string;
  maritalStatus?: string;
  permanentAddress?: string;
  country?: string;
  rt?: string;
  rw?: string;
  city?: string;
  subdistrict?: string;
  village?: string;
  zipCode?: string;
  currentAddress?: string;
  families?: {
    [id: string]: {
      relation?: string;
      name?: string;
      gender?: string;
      dateOfBirth?: string;
    }[];
  };
  formal?: string;
  educationLevel?: string;
  educationMajor?: string;
  schoolName?: string;
  gpa?: number;
  cityOfSchool?: string;
  certificationName?: string;
  institution?: string;
  issueDate?: string;
  language?: string;
};

const source: string[] = ['Email', 'Erajaya Career Fest', 'Instagram'];
const jobFunction: string[] = ['Accounting', 'Business', 'Client'];
const jobTitle: string[] = [
  'Internship Announce Radio',
  'Internship Administration',
  'Internship Application Developer',
];
const lineIndustry: string[] = ['Agribusiness', 'Apparel', 'Automotive'];
const level: string[] = ['Director', 'VP', 'General Manager'];

type FormData = {
  gender: string;
  phone_number: number;
  date_of_birth: string;
  source_referer: string;
  current_salary: number;
  linkedin_profile_url: string;
  experience: {
    company_name: string;
    job_function: string;
    job_title: string;
    job_level: string;
    line_industry: string;
    start_at: string;
    end_at: string;
    salary: string;
  };
};

const RegisterFormStep1 = () => {
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const [country, setCountry] = useState<string>('');
  const handleChangeCountry = (value: string) => {
    setCountry(value);
  };

  const [marriedValue, setMarriedValue] = useState<string>('');
  const handleChangeMarried = (value: string) => {
    setMarriedValue(value);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [idFamily, setIdFamily] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  // const handleAdd = () => {
  //   let id: number = idFamily;
  //   setIndex(idFamily);
  //   setIdFamily(idFamily + 1);
  // };

  const tabContent: JSX.Element[] = [
    <div key={index} className="row">
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Relation*</label>
          <Form.Item<FieldType>
            name={['families', idFamily.toString(), index, 'relation']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your family relation!',
              },
            ]}
          >
            <Select
              className="w-100"
              placeholder="Your Family Relation"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                ...(marriedValue === 'married'
                  ? [{ value: 'pasangan', label: 'Pasangan' }]
                  : []),
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Name*</label>
          <Form.Item<FieldType>
            name={['families', idFamily.toString(), index, 'name']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your relation name!',
              },
            ]}
          >
            <Input placeholder="Your Relation Name" />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Gender*</label>
          <Form.Item<FieldType>
            name={['families', idFamily.toString(), index, 'gender']}
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Please input your family gender!',
              },
            ]}
          >
            <Select
              className="w-100"
              placeholder="Your Family Gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div className="col-6">
        <div className="input-group-meta position-relative mb-15">
          <label>Date of Birth*</label>
          <Form.Item<FieldType>
            name={['families', idFamily.toString(), index, 'dateOfBirth']}
            rules={[
              {
                required: true,
                message: 'Please input your relation date of birth!',
              },
            ]}
          >
            <DatePicker
              className="w-100"
              placeholder="Select Date"
              onChange={onChangeDate}
            />
          </Form.Item>
        </div>
      </div>
    </div>,
  ];

  const initialItems = [{ label: 'New Relation', key: '1' }];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChangeTabs = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };
  // const [addValue, setAddValue] = useState<string>('');
  // let id: number;

  // const [tabContentValue, setTabContentValue] = useState([]);

  // const handleAdd2 = () => {
  //   // const newTabIndex = useRef(0);

  //   setTabContentValue((prevContent: any): any => {
  //     const counter = prevContent.length
  //       ? prevContent[prevContent.length - 1].children.props.key?.split(
  //           '-',
  //         )[1] + 1
  //       : 0;
  //     const newTab = {
  //       label: 'New Relation',
  //       children: (
  //         <div key={prevContent.length}>
  //           {/* <div className="col-6">
  //             <div className="input-group-meta position-relative mb-15">
  //               <label>Relation*</label>
  //               <Form.Item<FieldType>
  //                 name={['families', `${prevContent.length}`, counter, 'relation']}
  //                 className="mb-0"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: 'Please input your family relation!',
  //                   },
  //                 ]}
  //               >
  //                 <Select className="w-100" placeholder="Your Family Relation" options={} />
  //               </Form.Item>
  //             </div>
  //           </div> */}
  //           <div className="col-6">
  //             <div className="input-group-meta position-relative mb-15">
  //               <label>Relation*</label>
  //               <Form.Item<FieldType>
  //                 name={[
  //                   'families',
  //                   `${prevContent.length}`,
  //                   counter,
  //                   'relation',
  //                 ]}
  //                 className="mb-0"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: 'Please input your family relation!',
  //                   },
  //                 ]}
  //               >
  //                 <Select
  //                   className="w-100"
  //                   placeholder="Your Family Relation"
  //                   options={[
  //                     { value: 'male', label: 'Male' },
  //                     { value: 'female', label: 'Female' },
  //                     ...(marriedValue === 'married'
  //                       ? [{ value: 'pasangan', label: 'Pasangan' }]
  //                       : []),
  //                   ]}
  //                 />
  //               </Form.Item>
  //             </div>
  //           </div>
  //           <div className="col-6">
  //             <div className="input-group-meta position-relative mb-15">
  //               <label>Name*</label>
  //               <Form.Item<FieldType>
  //                 name={[
  //                   'families',
  //                   `${prevContent.length}`,
  //                   counter,
  //                   'relation',
  //                 ]}
  //                 className="mb-0"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: 'Please input your relation name!',
  //                   },
  //                 ]}
  //               >
  //                 <Input placeholder="Your Relation Name" />
  //               </Form.Item>
  //             </div>
  //           </div>
  //           {/* ... other form fields with unique names ... */}
  //         </div>
  //       ),
  //       key: `newTab${prevContent.length}-${newTabIndex.current++}`,
  //     };
  //     return [...prevContent, newTab];
  //   });
  // };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Relation',
      // children: tabContent,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setIndex(idFamily);
    setIdFamily(idFamily + 1);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  console.log('index: ', index);
  console.log('idFamily: ', idFamily);
  useEffect(() => {
    console.log('useEffect/index: ', index);
    console.log('useEffect/idFamily: ', idFamily);
  }, []);

  const [hasExperience, setHasExperience] = useState<string>('you-choose');
  const hasExperienceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasExperience(e.target.value);
  };

  const [formData, setFormData] = useState<FormData>({
    gender: 'default',
    phone_number: 0,
    date_of_birth: '',
    source_referer: 'default',
    current_salary: 0,
    linkedin_profile_url: '',
    experience: {
      company_name: '',
      job_function: '',
      job_title: '',
      job_level: '',
      line_industry: '',
      start_at: '',
      end_at: '',
      salary: '',
    },
  });

  const [hasLinkedIn, setHasLinkedIn] = useState<string>('you-choose');
  const linkedInRadiosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasLinkedIn(e.target.value);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value,
        },
      }));
      return;
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }
  };

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in formData?.experience) {
      setFormData((prevState) => ({
        ...prevState,
        experience: {
          ...prevState.experience,
          [name]: value,
        },
      }));
      return;
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }
  };

  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.info('the data', formData);
    const validate = userRegister2.safeParse(formData);
    if (!validate.success) {
      console.log('validate', validate.error.flatten());
    }

    const candidate = await createCandidates(formData);
    console.info(candidate);
    if (candidate.success === false) {
      return console.info('failed');
    }

    dispatch(setRegisterStep('third'));
  };
  return (
    <Form
      name="form1"
      variant="filled"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className="row mb-20">
        <label className="fw-bold">Profile</label>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Place of Birth*</label>
            <Form.Item<FieldType>
              name="placeOfBirth"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your place of birth!',
                },
              ]}
            >
              <Input placeholder="Your Place of Birth" />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Gender*</label>
            <Form.Item<FieldType>
              name="gender"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your gender!',
                },
              ]}
            >
              <Select
                className="w-100"
                placeholder="Your Gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Religion*</label>
            <Form.Item<FieldType>
              name="religion"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your religion!',
                },
              ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Religion"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Ethnicity*</label>
            <Form.Item<FieldType>
              name="ethnicity"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your ethnicity!',
                },
              ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Ethnicity"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Blood Type*</label>
            <Select
              className="w-100"
              placeholder="Your Blood Type"
              options={[
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'ab', label: 'AB' },
                { value: 'o', label: 'O' },
              ]}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Marital Status*</label>
            <Select
              className="w-100"
              showSearch
              placeholder="Your Marital Status"
              optionFilterProp="children"
              onChange={handleChangeMarried}
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: 'married',
                  label: 'Married',
                },
                {
                  value: '2',
                  label: 'Closed',
                },
                {
                  value: '3',
                  label: 'Communicated',
                },
              ]}
            />
          </div>
        </div>

        <label className="fw-bold mt-5">Address</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Permanent Address (as per ID/Passport)*</label>
            <Form.Item<FieldType>
              name="permanentAddress"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your permanent address!',
                },
              ]}
            >
              <Input placeholder="Your Permanent Address" />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Country*</label>
            <Form.Item<FieldType>
              name="country"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your country!',
                },
              ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your Country"
                optionFilterProp="children"
                onChange={handleChangeCountry}
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'indonesia',
                    label: 'Indonesia',
                  },
                  {
                    value: 'malaysia',
                    label: 'Malaysia',
                  },
                  {
                    value: 'singapura',
                    label: 'Singapura',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>City*</label>
            <Form.Item<FieldType>
              name="city"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your city!',
                },
              ]}
            >
              <Select
                className="w-100"
                showSearch
                placeholder="Your City"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'Not Identified',
                  },
                  {
                    value: '2',
                    label: 'Closed',
                  },
                  {
                    value: '3',
                    label: 'Communicated',
                  },
                  {
                    value: '4',
                    label: 'Identified',
                  },
                  {
                    value: '5',
                    label: 'Resolved',
                  },
                  {
                    value: '6',
                    label: 'Cancelled',
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          {country === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>RT*</label>
              <Form.Item<FieldType>
                name="rt"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please input your RT!',
                  },
                ]}
              >
                <Input placeholder="Your RT" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-6">
          {country === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>RW*</label>
              <Form.Item<FieldType>
                name="rw"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please input your RW!',
                  },
                ]}
              >
                <Input placeholder="Your RW" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-6">
          {country === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>Subdistrict*</label>
              <Form.Item<FieldType>
                name="subdistrict"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please input your subdistrict!',
                  },
                ]}
              >
                <Input placeholder="Your Subdistrict" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-6">
          {country === 'indonesia' && (
            <div className="input-group-meta position-relative mb-15">
              <label>Village*</label>
              <Form.Item<FieldType>
                name="village"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please input your village!',
                  },
                ]}
              >
                <Input placeholder="Your Village" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Zip Code*</label>
            <Form.Item<FieldType>
              name="zipCode"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your zip code!',
                },
              ]}
            >
              <Input placeholder="Your Zip Code" />
            </Form.Item>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <label>Current Address (Domicile)*</label>
            <Form.Item<FieldType>
              name="currentAddress"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your current address!',
                },
              ]}
            >
              <Input placeholder="Your Current Address" />
            </Form.Item>
          </div>
        </div>

        <label className="fw-bold mt-5 mb-2">Family Structure</label>
        <Tabs
          type="editable-card"
          onChange={onChangeTabs}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        />
        {activeKey && (
          <>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Relation*</label>
                <Form.Item<FieldType>
                  name={['families', idFamily.toString(), index, 'relation']}
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your family relation!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your Family Relation"
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      ...(marriedValue === 'married'
                        ? [{ value: 'pasangan', label: 'Pasangan' }]
                        : []),
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Name*</label>
                <Form.Item<FieldType>
                  name={['families', idFamily.toString(), index, 'name']}
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your relation name!',
                    },
                  ]}
                >
                  <Input placeholder="Your Relation Name" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Gender*</label>
                <Form.Item<FieldType>
                  name={['families', idFamily.toString(), index, 'gender']}
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your family gender!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your Family Gender"
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Date of Birth*</label>
                <Form.Item<FieldType>
                  name={['families', idFamily.toString(), index, 'dateOfBirth']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your relation date of birth!',
                    },
                  ]}
                >
                  <DatePicker
                    className="w-100"
                    placeholder="Select Date"
                    onChange={onChangeDate}
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}

        <div className="col-5 col-sm-6">
          <button
            className="btn-eleven fw-500 tran3s mt-10 btn-login btn-back"
            onClick={(e) => {
              e.preventDefault;
              dispatch(setRegisterStep(''));
            }}
          >
            Back
          </button>
        </div>
        <div className="col-5 col-sm-6">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s mt-10 btn-login btn-next"
          >
            Next
          </button>
        </div>
      </div>
    </Form>
  );
};

export default RegisterFormStep1;
