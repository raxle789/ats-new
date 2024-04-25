'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Cascader,
  Spin,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Checkbox,
  Col,
  Row,
  Slider,
  Radio,
  Button,
  notification,
  Modal,
} from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import Link from 'next/link';
// import {
//   yearOfExperienceMarks,
//   educationLevelMarks,
//   gradeMarks,
//   ageMarks,
// } from '@/data/job-posting-data';
// import { fpkData } from './job-fpk';
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;
const { confirm } = Modal;

type Props = {
  positionLevelRequirementData: any;
  positionLevelData: any;
  lineIndustryData: any;
  educationLevelData: any;
  setPositionLevelRequirementData: any;
};

const EmployJobParameterItem: React.FC<Props> = ({
  positionLevelRequirementData,
  positionLevelData,
  lineIndustryData,
  educationLevelData,
  setPositionLevelRequirementData,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const [spinning, setSpinning] = React.useState(false);

  // const openNotification = (placement) => {
  //   api.info({
  //     message: `Notification ${placement}`,
  //     description: (
  //       <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
  //     ),
  //     placement,
  //   });
  // };

  // const formRef = useRef({});

  // console.info(positionLevelRequirementData);

  // console.info(positionLevelData);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (positionLevelRequirementData) {
      positionLevelRequirementData?.positionLevelRequirements?.forEach(
        (data) => {
          form.setFieldsValue({
            [data?.requirementFields?.name]:
              data?.value === null || data?.value === undefined || !data?.value
                ? null
                : data?.value,
          });

          // if (data?.requirementFields?.name !== 'salary') {
          //   try {
          //     const data2 = JSON.parse(data?.value);

          //     const isArray = Array.isArray(data2);

          //     if (isArray) {
          //       form.setFieldsValue({
          //         [data?.requirementFields?.name]: data2,
          //       });
          //     } else {
          //       if (data.value === null || data.value === '') {
          //         form.setFieldsValue({ [data.requirementFields.name]: null });
          //       } else {
          //         const numberValue = Number(data?.value);
          //         form.setFieldsValue({
          //           [data?.requirementFields?.name]: isNaN(numberValue)
          //             ? data?.value
          //             : numberValue,
          //         });
          //       }
          //     }
          //   } catch (e) {
          //     if (data.value === null || data.value === '') {
          //       form.setFieldsValue({ [data.requirementFields.name]: null });
          //     } else {
          //       const numberValue = Number(data?.value);
          //       form.setFieldsValue({
          //         [data?.requirementFields?.name]: isNaN(numberValue)
          //           ? data?.value
          //           : numberValue,
          //       });
          //     }
          //   }
          // } else if (data?.requirementFields?.name === 'salary') {
          //   const data2 = JSON.parse(data?.value);

          //   form.setFieldsValue({
          //     [data?.requirementFields?.name]: {
          //       start_salary: data2 ? Number(data2[0]) : null,
          //       end_salary: data2 ? Number(data2[1]) : null,
          //     },
          //   });
          // }
        },
      );

      form.setFieldsValue({
        positionLevelId: Number(positionLevelRequirementData.id),
      });
    }
  }, [positionLevelRequirementData]);

  // const toggleRowExpansion = (index: number) => {
  //   setExpandedRows((prevExpandedRows) => ({
  //     ...prevExpandedRows,
  //     [index]: !prevExpandedRows[index],
  //   }));
  // };

  const showLoader = (show: boolean) => {
    setSpinning(show);
    // setTimeout(() => {
    //   setSpinning(false);
    // }, 3000);
  };

  function handleJobParameter(values: boolean) {
    showLoader(true);

    confirm({
      title: 'Do you want to create new job parameter?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            api.success({
              message: 'Notification',
              description: <p>Successfully Create New Job Parameter</p>,
              placement: 'topRight',
            });
            // console.info(values);
            setPositionLevelRequirementData(values)
              .then(() => {
                form.resetFields();
              })
              .catch((e: string) =>
                console.log('Error set position level requirement data: ', e),
              );
            // router.replace('/dashboard/ta/parameter');
            resolve();
          }, 2000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        router.refresh();

        showLoader(false);
      },
    });
  }

  // const [
  //   minimumYearOfExperienceParameterState,
  //   setMinimumYearOfExperienceParameterState,
  // ] = useState(false);

  // const [educationLevelParameterState, setEducationLevelParameterState] =
  //   useState(false);

  // const [majorOfStudiesParameterState, setMajorOfStudiesParameterState] =
  //   useState(false);

  // const [gradeParameterState, setGradeParameterState] = useState(false);

  // const [specialSkillParameterState, setSpecialSkillParameterState] =
  //   useState(false);

  // const [certificationsParameterState, setCertificationsParameterState] =
  //   useState(false);

  // const [salaryRangeParameterState, setSalaryRangeParameterState] =
  //   useState(false);

  // const [domicileParamaterState, setDomicileParamaterState] = useState(false);

  // const [maximumAgeParameterState, setMaximumAgeParameterState] =
  //   useState(false);

  // const [genderParameterState, setGenderParameterState] = useState(false);

  // const [religionParameterState, setReligionParameterState] = useState(false);

  // const [raceParameterState, setRaceParameterState] = useState(false);

  // const [lineIndustryParameterState, setLineIndustryParameterState] =
  //   useState(false);
  // const [jobFunctionParameterState, setJobFunctionParameterState] =
  //   useState(false);
  // const [positionLevelParameterState, setPositionLevelParameterState] =
  //   useState(false);

  // const handleCategory = (item: { value: string; label: string }) => {};
  // const handleJobType = (item: { value: string; label: string }) => {};
  // const handleSalary = (item: { value: string; label: string }) => {};

  // const handleFormatter = (value) => {
  //   if (value) {
  //     const formattedValue = new Intl.NumberFormat('id-ID', {
  //       style: 'currency',
  //       currency: 'IDR',
  //     }).format(value);
  //     return formattedValue.replace('IDR', 'Rp');
  //   }
  //   return '';
  // };

  // const handleParser = (value) => {
  //   const replacedValue = value.replace(/\D/g, ''); // Menghapus karakter selain digit
  //   return parseFloat(replacedValue);
  // };

  // const handleFormatter = (value) => {
  //   // Memformat nilai menjadi string dengan format mata uang Rupiah
  //   if (value) {
  //     const formattedValue = new Intl.NumberFormat('id-ID', {
  //       style: 'currency',
  //       currency: 'IDR',
  //     }).format(value);
  //     return formattedValue.replace('IDR', '').trim();
  //   }
  //   return '';
  // };

  // const handleFormatter = (value) => {
  //   // Memformat nilai menjadi string dengan format mata uang Rupiah
  //   if (value || value === 0) {
  //     const formattedValue = new Intl.NumberFormat('id-ID', {
  //       style: 'currency',
  //       currency: 'IDR',
  //     }).format(value);
  //     // Menghilangkan tanda Rupiah dan whitespace, jika value bukan null atau undefined
  //     return formattedValue.replace('IDR', '').trim();
  //   }
  //   return ''; // Kembalikan string kosong jika value null atau undefined
  // };

  // const handleParser = (value) => {
  //   // Menghapus semua karakter selain digit dan koma
  //   const replacedValue = value.replace(/[^\d,]/g, '');
  //   // Menghapus titik sebagai pemisah ribuan
  //   const dotRemovedValue = replacedValue.replace(/\./g, '');
  //   // Menghapus tanda Rupiah
  //   const rupiahRemovedValue = dotRemovedValue.replace(/^IDR\s?|,/g, '');
  //   return parseFloat(rupiahRemovedValue || '0'); // Parse menjadi float, atau 0 jika kosong
  // };

  return (
    <>
      <Spin spinning={spinning} fullscreen />
      {contextHolder}
      <Form
        form={form}
        className="bg-white card-box border-20"
        layout="vertical"
        variant="filled"
        onFinish={handleJobParameter}
      >
        {/* <h4 className="dash-title-three">Parameter Information</h4>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Position Level"
            name="positionLevel"
            rules={[
              { required: true, message: 'Please Select Position Level!' },
            ]}
          >
            <Select
              className="select"
              size="large"
              showSearch
              allowClear
              placeholder="Select Position Level"
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
        </div> */}

        <h4 className="dash-title-three">Requirement Settings</h4>
        <Form.Item className="d-none" name="positionLevelId">
          <Input className="d-none" type="hidden" />
        </Form.Item>
        <div className="dash-input-wrapper mb-30">
          <Form.Item
            label="Position Level"
            name="job_level"
            rules={[
              { required: true, message: 'Please Select Position Level!' },
            ]}
          >
            <Select
              className="select"
              size="large"
              showSearch
              allowClear
              placeholder="Select Position Level"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={positionLevelData}
            />
          </Form.Item>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              // name="minimumYearOfExperienceParameter"
              name="min_year_experience"
              label="Total Experience"
              rules={[
                {
                  required: true,
                  message: 'Please Input Total Experience Parameter!',
                },
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                min={0}
                step={1}
                placeholder="Input Total Experience"
                style={{ height: '40px' }}
              />
              {/* <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!minimumYearOfExperienceParameterState}
                placeholder="Select Total Experience"
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
              /> */}
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              label="Line Industry"
              name="line_industry"
              rules={[
                {
                  required: true,
                  message: 'Please Select Line Industry!',
                },
              ]}
            >
              <Select
                className="select"
                mode="multiple"
                size="large"
                showSearch
                allowClear
                // disabled={!educationLevelParameterState}
                placeholder="Select Line Industry"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={lineIndustryData}
              />
            </Form.Item>
          </div>
        </div>
        <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              label="Minimum Education Level"
              name="education_level"
              rules={[
                {
                  required: true,
                  message: 'Please Select Minimum Education Level!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!educationLevelParameterState}
                placeholder="Select Minimum Education Level"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={educationLevelData}
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              label="Major of Studies"
              name="majorOfStudiesParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Major Of Studies!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!majorOfStudiesParameterState}
                placeholder="Select Major of Studies"
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
        </div> */}
        {/* </div> */}
        <div className="dash-input-wrapper mb-30">
          <div className="col-lg-12">
            <Form.Item
              label="Minimum GPA"
              name="grade"
              rules={[
                {
                  required: true,
                  message: 'Please Input Minimum GPA!',
                },
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                // size="small"
                min={1}
                max={4}
                step={0.01}
                placeholder="Input Minimum GPA"
                style={{ height: '40px' }}
                // disabled={!gradeParameterState}
              />
            </Form.Item>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Special Skill"
              name="specialSkillParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Special Skill!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                mode="multiple"
                // disabled={!specialSkillParameterState}
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Select Special Skill"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Certifications"
              name="certificationsParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Certifications!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                mode="multiple"
                // disabled={!certificationsParameterState}
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                placeholder="Select Certifications"
                options={[
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                ]}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        <div className="dash-input-wrapper mb-5">
          <Form.Item label="Salary Range" name="salary">
            <Form.List name="salary">
              {() => (
                <div className="row">
                  <div className="col-lg-5">
                    <Form.Item
                      label="Start Salary Range"
                      name="start_salary"
                      rules={[
                        {
                          required: true,
                          message: 'Please Input Start Salary Range!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="select d-flex align-items-center w-100"
                        min={0}
                        placeholder="Input Start Salary Range"
                        style={{ height: '40px' }}
                        formatter={(value) =>
                          `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        }
                        parser={(value: string | undefined): string | number =>
                          value!.replace(/\Rp\s?|(\.*)/g, '')
                        }
                        // formatter={handleFormatter}
                        // parser={handleParser}
                        // disabled={!salaryRangeParameterState}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-lg-2 d-flex align-items-center justify-content-center">
                    <b>
                      <p className="text-center">__</p>
                    </b>
                  </div>
                  <div className="col-lg-5">
                    <Form.Item
                      label="End Salary Range"
                      name="end_salary"
                      rules={[
                        {
                          required: true,
                          message: 'Please Input End Salary Range!',
                        },
                      ]}
                    >
                      <InputNumber
                        className="select d-flex align-items-center w-100"
                        min={0}
                        placeholder="Input End Salary Range"
                        style={{ height: '40px' }}
                        formatter={(value) =>
                          `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        }
                        parser={(value: string | undefined): string | number =>
                          value!.replace(/\Rp\s?|(\.*)/g, '')
                        }
                        // disabled={!salaryRangeParameterState}
                      />
                    </Form.Item>
                  </div>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </div>

        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Domicile"
              name="domicileParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Domicile!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!domicileParamaterState}
                placeholder="Select Domicile"
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
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Maximum Age"
              name="maximumAgeParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Maximum Age',
                },
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                min={17}
                max={50}
                placeholder="Select Maximum Age!"
                style={{ height: '40px' }}
              />
            </Form.Item>
          </div>
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Gender"
              name="genderParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Gender!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                // disabled={!genderParameterState}
                allowClear
                placeholder="Select Gender"
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
        </div> */}
        {/* // </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Religion"
              name="religionParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Religion!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!religionParameterState}
                placeholder="Select Religion"
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
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="col-xxl-8">
            <Form.Item
              label="Race"
              name="raceParameter"
              rules={[
                {
                  required: true,
                  message: 'Please Select Race Parameter!',
                },
              ]}
            >
              <Select
                className="select"
                size="large"
                showSearch
                allowClear
                // disabled={!raceParameterState}
                placeholder="Select Race Parameter"
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
        </div> */}
        {/* </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="lineIndustryParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                  // checked={lineIndustryParameterState}
                  // onChange={() =>
                  //   setLineIndustryParameterState(!lineIndustryParameterState)
                  // }
                >
                  Line Industry
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Check this parameter to enable filter Line Industry
              </React.Fragment>
            </div>
          </div>
        </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="jobFunctionParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                >
                  Job Function
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Check this parameter to enable filter Job Function
              </React.Fragment>
            </div>
          </div>
        </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <div className="row">
            <div className="col-xxl-4">
              <Form.Item
                name="positionLevelParameterCheckbox"
                valuePropName="checked"
                className="form-item-custom-ant"
              >
                <Checkbox
                  className="checkbox d-flex align-items-center"
                >
                  Position Level
                </Checkbox>
              </Form.Item>
              <React.Fragment>
                Checked this parameter to enable filter Position Level
              </React.Fragment>
            </div>
          </div>
        </div> */}

        <div className="button-group d-flex flex-row align-items-center justify-content-start mt-50 w-100">
          <Form.Item className="mb-0">
            <Button
              className="dash-btn-two tran3s me-3"
              htmlType="submit"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '3px',
              }}
            >
              Submit
            </Button>
          </Form.Item>
          {/* <a href="#" className="dash-btn-two tran3s me-3">
              Next
            </a> */}
          <Link
            href="/dashboard/ta/parameter"
            className="dash-cancel-btn tran3s"
            type="button"
            onClick={() => showLoader(true)}
          >
            Cancel
          </Link>
        </div>
      </Form>
    </>
  );
};

export default EmployJobParameterItem;
