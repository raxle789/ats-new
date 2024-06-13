'use client';

import { Form, Input, InputNumber, Select, Button } from 'antd';
import Link from 'next/link';

const SubmitPositionLevelRequirementForm = ({
  form,
  handleSubmitPositionLevelRequirement,
  positionLevelData,
  lineIndustryData,
  educationLevelData,
  handleCancel,
}) => {
  // (function handleSalaryInput(add) {
  //   add();
  // })();

  return (
    // <Form
    //   form={form}
    //   scrollToFirstError
    //   className="bg-white card-box border-20"
    //   layout="vertical"
    //   variant="filled"
    //   onFinish={handleSubmitPositionLevelRequirement}
    // >
    //   <h4 className="dash-title-three">Requirement Settings</h4>
    //   <Form.Item className="d-none" name="positionLevelId">
    //     <Input className="d-none" type="hidden" />
    //   </Form.Item>
    //   <div className="dash-input-wrapper mb-30">
    //     <Form.Item
    //       label="Position Level"
    //       name="job_level"
    //       rules={[{ required: true, message: 'Please Select Position Level!' }]}
    //     >
    //       <Select
    //         className="select"
    //         size="large"
    //         showSearch
    //         allowClear
    //         placeholder="Select Position Level"
    //         optionFilterProp="children"
    //         filterOption={(input, option) =>
    //           (option?.label ?? '').includes(input)
    //         }
    //         // filterSort={(optionA, optionB) =>
    //         //   (optionA?.label ?? '')
    //         //     .toLowerCase()
    //         //     .localeCompare((optionB?.label ?? '').toLowerCase())
    //         // }
    //         options={positionLevelData}
    //       />
    //     </Form.Item>
    //   </div>
    //   <div className="dash-input-wrapper mb-30">
    //     <div className="col-lg-12">
    //       <Form.Item
    //         // name="minimumYearOfExperienceParameter"
    //         name="min_year_experience"
    //         label="Total Experience"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please Input Total Experience Parameter!',
    //           },
    //         ]}
    //       >
    //         <InputNumber
    //           className="select d-flex align-items-center w-100"
    //           min={0}
    //           step={1}
    //           placeholder="Input Total Experience"
    //           style={{ height: '40px' }}
    //         />
    //       </Form.Item>
    //     </div>
    //   </div>
    //   {/* </div> */}
    //   <div className="dash-input-wrapper mb-30">
    //     <div className="col-lg-12">
    //       <Form.Item
    //         label="Line Industry"
    //         name="line_industry"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please Select Line Industry!',
    //           },
    //         ]}
    //       >
    //         <Select
    //           className="select"
    //           mode="multiple"
    //           size="large"
    //           showSearch
    //           allowClear
    //           // disabled={!educationLevelParameterState}
    //           placeholder="Select Line Industry"
    //           optionFilterProp="children"
    //           filterOption={(input, option) =>
    //             (option?.label ?? '').includes(input)
    //           }
    //           filterSort={(optionA, optionB) =>
    //             (optionA?.label ?? '')
    //               .toLowerCase()
    //               .localeCompare((optionB?.label ?? '').toLowerCase())
    //           }
    //           options={lineIndustryData}
    //         />
    //       </Form.Item>
    //     </div>
    //   </div>
    //   <div className="dash-input-wrapper mb-30">
    //     <div className="col-lg-12">
    //       <Form.Item
    //         label="Minimum Education Level"
    //         name="education_level"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please Select Minimum Education Level!',
    //           },
    //         ]}
    //       >
    //         <Select
    //           className="select"
    //           size="large"
    //           showSearch
    //           allowClear
    //           // disabled={!educationLevelParameterState}
    //           placeholder="Select Minimum Education Level"
    //           optionFilterProp="children"
    //           filterOption={(input, option) =>
    //             (option?.label ?? '').includes(input)
    //           }
    //           options={educationLevelData}
    //         />
    //       </Form.Item>
    //     </div>
    //   </div>

    //   <div className="dash-input-wrapper mb-30">
    //     <div className="col-lg-12">
    //       <Form.Item
    //         label="Minimum GPA"
    //         name="grade"
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please Input Minimum GPA!',
    //           },
    //         ]}
    //       >
    //         <InputNumber
    //           className="select d-flex align-items-center w-100"
    //           // size="small"
    //           min={1}
    //           max={4}
    //           step={0.01}
    //           placeholder="Input Minimum GPA"
    //           style={{ height: '40px' }}
    //           // disabled={!gradeParameterState}
    //         />
    //       </Form.Item>
    //     </div>
    //   </div>

    //   <div className="dash-input-wrapper mb-5">
    //     <Form.Item
    //       // label="Salary Range"
    //       name="salary"
    //       // rules={
    //       //   [
    //       //     // ({ getFieldValue }) => ({
    //       //     //   validator: (rule, value) => {
    //       //     //     if (
    //       //     //       getFieldValue('start_salary') >= getFieldValue('end_salary')
    //       //     //     ) {
    //       //     //       return Promise.reject(
    //       //     //         new Error(
    //       //     //           'Start Salary Range Must Bellow End Salary Range',
    //       //     //         ),
    //       //     //       );
    //       //     //     }
    //       //     //   },
    //       //     // }),
    //       //   ]
    //       // }
    //     >
    //       <Form.List
    //         name="salary"
    //         rules={[
    //           {
    //             validator: (rule, value) => {
    //               // console.info(value);
    //               if (
    //                 value &&
    //                 value?.length === 2 &&
    //                 value[0] &&
    //                 value[1] &&
    //                 value[0] >= value[1]
    //               ) {
    //                 return Promise.reject(
    //                   new Error(
    //                     'Start Salary Range Must Bellow End Salary Range!',
    //                   ),
    //                 );
    //               } else {
    //                 return Promise.resolve();
    //               }
    //             },
    //           },
    //         ]}
    //       >
    //         {(fields, { add, remove }, { errors }) => (
    //           <>
    //             {fields.map((field, index) => (
    //               <div className="row" key={index}>
    //                 <div className="col-lg-5">
    //                   <Form.Item
    //                     label="Start Salary Range"
    //                     name="start_salary"
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: 'Please Input Start Salary Range!',
    //                       },
    //                       // ({ getFieldValue }) => ({
    //                       //   required: true,
    //                       //   message: 'Please Input Start Salary Range!',
    //                       //   validator: async (rule, value) => {
    //                       //     if (value >= getFieldValue('end_salary')) {
    //                       //       return Promise.reject(
    //                       //         new Error(
    //                       //           'Start Salary Range Must Bellow End Salary Range!',
    //                       //         ),
    //                       //       );
    //                       //     } else {
    //                       //       return Promise.resolve();
    //                       //     }
    //                       //   },
    //                       // }),
    //                     ]}
    //                   >
    //                     <InputNumber
    //                       className="select d-flex align-items-center w-100"
    //                       prefix="Rp"
    //                       min={0}
    //                       placeholder="Input Start Salary Range"
    //                       style={{ height: '40px' }}
    //                       formatter={(value) =>
    //                         `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    //                       }
    //                       parser={(
    //                         value: string | undefined,
    //                       ): string | number =>
    //                         value!.replace(/\Rp\s?|(\.*)/g, '')
    //                       }
    //                       // formatter={handleFormatter}
    //                       // parser={handleParser}
    //                       // disabled={!salaryRangeParameterState}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //                 <div className="col-lg-2 d-flex align-items-center justify-content-center">
    //                   <b>
    //                     <p className="text-center">__</p>
    //                   </b>
    //                 </div>
    //                 <div className="col-lg-5">
    //                   <Form.Item
    //                     label="End Salary Range"
    //                     name="end_salary"
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: 'Please Input End Salary Range!',
    //                       },
    //                       // ({ getFieldValue }) => ({
    //                       //   required: true,
    //                       //   message: 'Please Input End Salary Range!',
    //                       //   validator: (rule, value) => {
    //                       //     if (value <= getFieldValue('start_salary')) {
    //                       //       return Promise.reject(
    //                       //         new Error(
    //                       //           'End Salary Range Must Below Start Salary Range!',
    //                       //         ),
    //                       //       );
    //                       //     } else {
    //                       //       return Promise.resolve();
    //                       //     }
    //                       //   },
    //                       // }),
    //                     ]}
    //                   >
    //                     <InputNumber
    //                       className="select d-flex align-items-center w-100"
    //                       prefix="Rp"
    //                       min={0}
    //                       placeholder="Input End Salary Range"
    //                       style={{ height: '40px' }}
    //                       formatter={(value) =>
    //                         `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    //                       }
    //                       parser={(
    //                         value: string | undefined,
    //                       ): string | number =>
    //                         value!.replace(/\Rp\s?|(\.*)/g, '')
    //                       }
    //                       // disabled={!salaryRangeParameterState}
    //                     />
    //                   </Form.Item>
    //                 </div>
    //               </div>
    //             ))}

    //             {/* {(() => add())()} */}

    //             <div className="col-lg-5">
    //               <Form.ErrorList errors={errors} />
    //             </div>
    //           </>

    //           // <div className="row">
    //           //   <div className="col-lg-5">
    //           //     <Form.Item
    //           //       label="Start Salary Range"
    //           //       name="start_salary"
    //           //       rules={[
    //           //         {
    //           //           required: true,
    //           //           message: 'Please Input Start Salary Range!',
    //           //         },
    //           //         // ({ getFieldValue }) => ({
    //           //         //   required: true,
    //           //         //   message: 'Please Input Start Salary Range!',
    //           //         //   validator: async (rule, value) => {
    //           //         //     if (value >= getFieldValue('end_salary')) {
    //           //         //       return Promise.reject(
    //           //         //         new Error(
    //           //         //           'Start Salary Range Must Bellow End Salary Range!',
    //           //         //         ),
    //           //         //       );
    //           //         //     } else {
    //           //         //       return Promise.resolve();
    //           //         //     }
    //           //         //   },
    //           //         // }),
    //           //       ]}
    //           //     >
    //           //       <InputNumber
    //           //         className="select d-flex align-items-center w-100"
    //           //         prefix="Rp"
    //           //         min={0}
    //           //         placeholder="Input Start Salary Range"
    //           //         style={{ height: '40px' }}
    //           //         formatter={(value) =>
    //           //           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    //           //         }
    //           //         parser={(value: string | undefined): string | number =>
    //           //           value!.replace(/\Rp\s?|(\.*)/g, '')
    //           //         }
    //           //         // formatter={handleFormatter}
    //           //         // parser={handleParser}
    //           //         // disabled={!salaryRangeParameterState}
    //           //       />
    //           //     </Form.Item>
    //           //   </div>
    //           //   <div className="col-lg-2 d-flex align-items-center justify-content-center">
    //           //     <b>
    //           //       <p className="text-center">__</p>
    //           //     </b>
    //           //   </div>
    //           //   <div className="col-lg-5">
    //           //     <Form.Item
    //           //       label="End Salary Range"
    //           //       name="end_salary"
    //           //       rules={[
    //           //         {
    //           //           required: true,
    //           //           message: 'Please Input End Salary Range!',
    //           //         },
    //           //         // ({ getFieldValue }) => ({
    //           //         //   required: true,
    //           //         //   message: 'Please Input End Salary Range!',
    //           //         //   validator: (rule, value) => {
    //           //         //     if (value <= getFieldValue('start_salary')) {
    //           //         //       return Promise.reject(
    //           //         //         new Error(
    //           //         //           'End Salary Range Must Below Start Salary Range!',
    //           //         //         ),
    //           //         //       );
    //           //         //     } else {
    //           //         //       return Promise.resolve();
    //           //         //     }
    //           //         //   },
    //           //         // }),
    //           //       ]}
    //           //     >
    //           //       <InputNumber
    //           //         className="select d-flex align-items-center w-100"
    //           //         prefix="Rp"
    //           //         min={0}
    //           //         placeholder="Input End Salary Range"
    //           //         style={{ height: '40px' }}
    //           //         formatter={(value) =>
    //           //           `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    //           //         }
    //           //         parser={(value: string | undefined): string | number =>
    //           //           value!.replace(/\Rp\s?|(\.*)/g, '')
    //           //         }
    //           //         // disabled={!salaryRangeParameterState}
    //           //       />
    //           //     </Form.Item>
    //           //   </div>
    //           //   <div className="col-lg-5">
    //           //     <Form.ErrorList errors={errors} />
    //           //   </div>
    //           // </div>
    //         )}
    //       </Form.List>
    //     </Form.Item>
    //   </div>

    //   <div className="button-group d-flex flex-row align-items-center justify-content-start mt-50 w-100">
    //     <Form.Item className="mb-0">
    //       <Button
    //         className="dash-btn-two tran3s me-3"
    //         htmlType="submit"
    //         style={{
    //           height: '40px',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           paddingBottom: '3px',
    //         }}
    //       >
    //         Submit
    //       </Button>
    //     </Form.Item>
    //     {/* <a href="#" className="dash-btn-two tran3s me-3">
    //           Next
    //         </a> */}
    //     <Link
    //       href="#"
    //       className="dash-cancel-btn tran3s"
    //       type="button"
    //       onClick={handleCancel}
    //     >
    //       Cancel
    //     </Link>
    //   </div>
    // </Form>
    <Form
      form={form}
      scrollToFirstError
      className="bg-white card-box border-20"
      layout="vertical"
      variant="filled"
      onFinish={handleSubmitPositionLevelRequirement}
    >
      <h4 className="dash-title-three">Requirement Settings</h4>
      <Form.Item className="d-none" name="positionLevelId">
        <Input className="d-none" type="hidden" />
      </Form.Item>
      <div className="dash-input-wrapper mb-30">
        <Form.Item
          label="Position Level"
          name="job_level"
          rules={[{ required: true, message: 'Please Select Position Level!' }]}
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
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? '')
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? '').toLowerCase())
            // }
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
          </Form.Item>
        </div>
      </div>
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
              options={educationLevelData}
            />
          </Form.Item>
        </div>
      </div>
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
      <div className="dash-input-wrapper mb-5">
        {/* <Form.Item label="Salary Range" name="salary">
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
                      prefix="Rp"
                      min={0}
                      placeholder="Input Start Salary Range"
                      style={{ height: '40px' }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
                      prefix="Rp"
                      min={0}
                      placeholder="Input End Salary Range"
                      style={{ height: '40px' }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
        </Form.Item> */}

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
                ({ getFieldValue }) => ({
                  validator: (rule, value) => {
                    if (value >= getFieldValue('end_salary')) {
                      return Promise.reject(
                        new Error(
                          'Start Salary Range Must Be Below End Salary Range!',
                        ),
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                prefix="Rp"
                min={0}
                placeholder="Input Start Salary Range"
                style={{ height: '40px' }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
                ({ getFieldValue }) => ({
                  validator: (rule, value) => {
                    if (value <= getFieldValue('start_salary')) {
                      return Promise.reject(
                        new Error(
                          'End Salary Range Must Be Above Start Salary Range!',
                        ),
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <InputNumber
                className="select d-flex align-items-center w-100"
                prefix="Rp"
                min={0}
                placeholder="Input End Salary Range"
                style={{ height: '40px' }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }
                parser={(value: string | undefined): string | number =>
                  value!.replace(/\Rp\s?|(\.*)/g, '')
                }
                // disabled={!salaryRangeParameterState}
              />
            </Form.Item>
          </div>
        </div>
      </div>
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
          href="#"
          className="dash-cancel-btn tran3s"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default SubmitPositionLevelRequirementForm;
