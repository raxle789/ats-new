'use client';
import React, { useEffect, useRef } from 'react';
import { createCandidate } from '@/libs/Registration';
import { userRegister2 } from '@/libs/validations/Register';
import { setRegisterStep } from '@/redux/features/fatkhur/registerSlice';
import { useAppDispatch } from '@/redux/hook';
import { useState } from 'react';
import {
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Radio,
  InputNumber,
  Button,
  Divider,
  Space,
} from 'antd';
import type {
  DatePickerProps,
  FormProps,
  RadioChangeEvent,
  InputRef,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
let languageIndex = 0;

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
    };
  };
  formalOption?: string;
  educationLevel?: string;
  educationMajor?: string;
  schoolName?: string;
  gpa?: number;
  cityOfSchool?: string;
  certificationName?: string;
  institution?: string;
  issueDate?: string;
  monthIssue?: string;
  yearIssue?: string;
  language?: {
    [id: string]: {
      name?: string;
      level?: string;
    };
  };
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
            name={['families', index.toString(), 'relation']}
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
            name={['families', index.toString(), 'name']}
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
            name={['families', index.toString(), 'gender']}
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
            name={['families', index.toString(), 'dateOfBirth']}
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

  const initialItems = [{ label: 'Relation', children: tabContent, key: '1' }];
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
      label: 'Relation',
      children: tabContent,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setIndex(index + 1);
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

  const [formalValue, setFormalValue] = useState<string>('you-choose');
  const onChangeFormal = (e: RadioChangeEvent) => {
    setFormalValue(e.target.value);
  };

  const [issueValue, setIssueValue] = useState<string>('you-choose');
  const onChangeIssue = (e: RadioChangeEvent) => {
    setIssueValue(e.target.value);
  };

  const [languageItems, setLanguageItems] = useState(['English', 'Mandarin']);
  const [langTotal, setLangTotal] = useState<number>(1);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addLangSkill = () => {
    if (langTotal <= 3) {
      setLangTotal(langTotal + 1);
    }
  };

  const addLanguage = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setLanguageItems([...languageItems, name || `New item ${languageIndex++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    setIndex(index + 1);
    
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

    const candidate = await createCandidate(formData);
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
            <Form.Item<FieldType>
              name="bloodType"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your blood type!',
                },
              ]}
            >
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
            </Form.Item>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group-meta position-relative mb-15">
            <label>Marital Status*</label>
            <Form.Item<FieldType>
              name="maritalStatus"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your marital status!',
                },
              ]}
            >
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
            </Form.Item>
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

        <label className="fw-bold mt-5 mb-2">Education</label>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-15">
            <Form.Item<FieldType>
              name="formalOption"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Please choose your education!',
                },
              ]}
            >
              <Radio.Group onChange={onChangeFormal} value={formalValue}>
                <Radio className="d-flex" value="formal">
                  Formal
                </Radio>
                <Radio className="d-flex" value="informal">
                  Informal
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        {formalValue === 'formal' && (
          <>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Education Level*</label>
                <Form.Item<FieldType>
                  name="educationLevel"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your education level!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your Education Level"
                    options={[
                      { value: 'a', label: 'A' },
                      { value: 'b', label: 'B' },
                      { value: 'ab', label: 'AB' },
                      { value: 'o', label: 'O' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Education Major*</label>
                <Form.Item<FieldType>
                  name="educationMajor"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your education major!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    mode="tags"
                    maxCount={1}
                    placeholder="Your Education Major"
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
                </Form.Item>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label>School/University Name*</label>
                <Form.Item<FieldType>
                  name="schoolName"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your school name!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    showSearch
                    mode="tags"
                    maxCount={1}
                    placeholder="Your Education Major"
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
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>GPA*</label>
                <Form.Item<FieldType>
                  name="gpa"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your gpa!',
                    },
                  ]}
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    max={4}
                    step={0.01}
                    placeholder="Your GPA"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>City*</label>
                <Form.Item<FieldType>
                  name="cityOfSchool"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your city of school!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Your City of School"
                    options={[
                      { value: 'a', label: 'A' },
                      { value: 'b', label: 'B' },
                      { value: 'ab', label: 'AB' },
                      { value: 'o', label: 'O' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}

        {formalValue === 'informal' && (
          <>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label>Name (Certification/Licence)*</label>
                <Form.Item<FieldType>
                  name="certificationName"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your certification name!',
                    },
                  ]}
                >
                  <Input placeholder="Your Certification Name" />
                </Form.Item>
              </div>
            </div>
            <div className="col-12">
              <div className="input-group-meta position-relative mb-15">
                <label>Institution*</label>
                <Form.Item<FieldType>
                  name="institution"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your institution!',
                    },
                  ]}
                >
                  <Input placeholder="Your Institution" />
                </Form.Item>
              </div>
            </div>
            <div className="col-4">
              <div className="input-group-meta position-relative mb-15">
                <label>Issue Date*</label>
                <Form.Item<FieldType>
                  name="issueDate"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your issue date!',
                    },
                  ]}
                >
                  <Radio.Group onChange={onChangeIssue} value={issueValue}>
                    <Radio className="d-flex" value="expired">
                      Expired
                    </Radio>
                    <Radio className="d-flex" value="not-yet">
                      Not Yet
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            {issueValue === 'expired' && (
              <>
                <div className="col-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Month*</label>
                    <Form.Item<FieldType>
                      name="monthIssue"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose month!',
                        },
                      ]}
                    >
                      <DatePicker placeholder="Select Month" picker="month" />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group-meta position-relative mb-15">
                    <label>Year*</label>
                    <Form.Item<FieldType>
                      name="yearIssue"
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose year!',
                        },
                      ]}
                    >
                      <DatePicker placeholder="Select Year" picker="year" />
                    </Form.Item>
                  </div>
                </div>
              </>
            )}
            {issueValue === 'not-yet' && <div className="col-8"></div>}
            {issueValue === 'you-choose' && <div className="col-8"></div>}
          </>
        )}

        <label className="fw-bold mt-5 mb-2">Language</label>
        {Array.from({ length: langTotal }, (_, index) => (
          <div key={index} className="row">
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['language', index.toString(), 'name']}
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your language!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Select Language"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onLanguageChange}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button
                            type="text"
                            icon={
                              <PlusOutlined
                              onPointerEnterCapture=""
                              onPointerLeaveCapture=""
                              />
                            }
                            onClick={addLanguage}
                          >
                            Add item
                          </Button>
                        </Space>
                      </>
                    )}
                    options={languageItems.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['language', index.toString(), 'level']}
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your level!',
                    },
                  ]}
                >
                  <Select
                    className="w-100"
                    placeholder="Select Level"
                    options={[
                      { value: 'fluent', label: 'Fluent' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'basic', label: 'Basic' },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <div className="mb-15">
            <Button onClick={addLangSkill}>ADD</Button>
          </div>
        </div>

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
