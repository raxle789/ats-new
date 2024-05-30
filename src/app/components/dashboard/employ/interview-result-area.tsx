import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Radio, message, Rate } from 'antd';
import type { RadioChangeEvent, FormProps } from 'antd';
import { FiThumbsDown } from 'react-icons/fi';
import { FiThumbsUp } from 'react-icons/fi';

const { TextArea } = Input;

interface FieldType {
  identityInfo?: {
    fullname?: string;
    age?: number;
    maritalStatus?: string;
    lastEducation?: string;
    position?: string;
    source?: string;
    assessmentResult?: string;
    discProfile?: string;
  };
  resultInfo?: {
    eduBackground?: number;
    eduBackgroundComment?: string;
    workExp?: number;
    workExpComment?: string;
    comSkills?: number;
    comSkillsComment?: string;
    qualityOriented?: number;
    qualityOrientedComment?: string;
    achievementOriented?: number;
    achievementOrientedComment?: string;
    devOthers?: number;
    devOthersComment?: string;
    creativeAgility?: number;
    creativeAgilityComment?: string;
    leadOthers?: number;
    leadOthersComment?: string;
    strategicThinking?: number;
    strategicThinkingComment?: string;
    reliablePartner?: number;
    reliablePartnerComment?: string;
    techSavvy?: number;
    techSavvyComment?: string;
    scoreTotal?: string;
    interviewResult?: string;
  };
}

const desc = ['terrible', 'bad', 'normal', 'good'];

const InterviewResultArea = () => {
  // UseState
  const [form] = Form.useForm();
  const [radioValues, setRadioValues] = useState<number[]>([]);
  const [scoreTotal, setScoreTotal] = useState('');
  const [rating, setRating] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  // Functions
  const onChange = (index: number, e: RadioChangeEvent) => {
    const newValues = [...radioValues];
    newValues[index] = e.target.value;
    setRadioValues(newValues);
  };

  const handleRatingClick = (index: number, value: number) => {
    let stateChanged = [...rating];
    stateChanged[index] = value;
    setRating(stateChanged);
  };

  const handleSubmit: FormProps<FieldType>['onFinish'] = () => {
    // showModal();
    let values = form.getFieldsValue();
    values = {
      ...values,
      resultInfo: { ...values.resultInfo, scoreTotal: scoreTotal },
    };
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields
        .map((field) => field.errors.join(', '))
        .join('; ');
      message.error(`Failed: ${errorMessage}`);
    }
  };

  // UseEffect
  useEffect(() => {
    // console.log('radio values: ', radioValues);
    if (radioValues) {
      const initialValue = 0;
      const sumWithInitial = radioValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      const mean = sumWithInitial / 11;
      const score = mean.toFixed(2);
      setScoreTotal(score);
    }
  }, [radioValues]);

  useEffect(() => {
    console.log('ratingUseEffect: ', rating);
  }, [rating]);
  return (
    <>
      <div className="job-fpk-header mb-40 lg-mb-30">
        <div className="d-sm-flex align-items-start justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0 flex-grow-1">Interview Report Form</h2>
        </div>
      </div>
      <div className="bg-white card-box border-20">
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Name</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'fullname']}
                  className="mb-0"
                  /* Display Error */
                  // validateStatus={errors?.fullname ? 'error' : ''}
                  // help={errors && errors.fullname}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Age</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'age']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.education && errors.education.gpa
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.education &&
                  //   errors.education.gpa?._errors.toString()
                  // }
                >
                  <InputNumber
                    className="w-100"
                    min={1}
                    step={11}
                    placeholder="Age"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Marital Status</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'maritalStatus']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.profile && errors.profile.maritalStatus
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.profile &&
                  //   errors.profile.maritalStatus?._errors.toString()
                  // }
                >
                  <Input placeholder="Marital Status" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Education Level</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'lastEducation']}
                  className="mb-0"
                  // validateStatus={
                  //   errors &&
                  //   errors.education &&
                  //   errors.education.educationLevel
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.education &&
                  //   errors.education.educationLevel?._errors.toString()
                  // }
                >
                  <Input placeholder="Last Education" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Position</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'position']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.profile && errors.profile.maritalStatus
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.profile &&
                  //   errors.profile.maritalStatus?._errors.toString()
                  // }
                >
                  <Input placeholder="Position" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Source</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'source']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.profile && errors.profile.maritalStatus
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.profile &&
                  //   errors.profile.maritalStatus?._errors.toString()
                  // }
                >
                  <Input placeholder="Source" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>Assessment Result</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'assessmentResult']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.profile && errors.profile.maritalStatus
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.profile &&
                  //   errors.profile.maritalStatus?._errors.toString()
                  // }
                >
                  <Input placeholder="Assessment Result" />
                </Form.Item>
              </div>
            </div>
            <div className="col-6">
              <div className="input-group-meta position-relative mb-15">
                <label>DISC Profile</label>
                <Form.Item<FieldType>
                  name={['identityInfo', 'discProfile']}
                  className="mb-0"
                  // validateStatus={
                  //   errors && errors.profile && errors.profile.maritalStatus
                  //     ? 'error'
                  //     : ''
                  // }
                  // help={
                  //   errors &&
                  //   errors.profile &&
                  //   errors.profile.maritalStatus?._errors.toString()
                  // }
                >
                  <Input placeholder="DISC Profile" />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Education Background</label>
                <label>
                  Candidate has an educational/training background that is
                  relevant to the position
                </label>
                <div className="row">
                  <div className="col-2">
                    <Form.Item<FieldType>
                      name={['resultInfo', 'eduBackground']}
                      className="mt-2 mb-0"
                    >
                      <div>
                        {/* <button
                          type="button"
                          className={`${rating[0] === 1 ? 'rating-active1' : 'rating-icon'}`}
                          onClick={() => handleRatingClick(0, 1)}
                        >
                          <FiThumbsDown />
                        </button>
                        <button
                          type="button"
                          className={`${rating[0] === 2 ? 'rating-active2' : 'rating-icon'}`}
                          onClick={() => handleRatingClick(0, 2)}
                        >
                          <FiThumbsDown />
                        </button>
                        <button
                          type="button"
                          className={`${rating[0] === 3 ? 'rating-active2' : 'rating-icon'}`}
                          onClick={() => handleRatingClick(0, 3)}
                        >
                          <FiThumbsUp />
                        </button>
                        <button
                          type="button"
                          className={`${rating[0] === 4 ? 'rating-active3' : 'rating-icon2'}`}
                          onClick={() => handleRatingClick(0, 4)}
                        >
                          <FiThumbsUp />
                        </button> */}
                        <Rate
                          tooltips={desc}
                          onChange={(value) => handleRatingClick(0, value)}
                          value={rating[0]}
                          count={4}
                        />
                      </div>
                    </Form.Item>
                  </div>
                  <div className="col-10">
                    <Form.Item<FieldType>
                      name={['resultInfo', 'eduBackgroundComment']}
                      className="mb-0"
                    >
                      <TextArea
                        placeholder="Comment"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Working Experience</label>
                <label>
                  Candidate has work experience with the skills and
                  qualifications which are the same or similar to the position
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'workExp']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[1]}
                    onChange={(e) => onChange(1, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'workExpComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Communication Skills</label>
                <label>
                  Candidate is able to express ideas systematically and clearly
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'comSkills']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[2]}
                    onChange={(e) => onChange(2, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'comSkillsComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Quality Oriented</label>
                <label>
                  Candidate demonstrates a focus on quality by striving to meet
                  high performance standards and improve work process
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'qualityOriented']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[3]}
                    onChange={(e) => onChange(3, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'qualityOrientedComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Achievement Oriented</label>
                <label>
                  Candidate has an orientation towards achieving better work
                  performance that exceeds the company's standards
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'achievementOriented']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[4]}
                    onChange={(e) => onChange(4, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'achievementOrientedComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Developing Others</label>
                <label>
                  Candidate is able to encourage themselves and/or others to
                  develop/grow
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'devOthers']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[5]}
                    onChange={(e) => onChange(5, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'devOthersComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Creative Agility</label>
                <label>
                  Candidate is able to identify, propose, and develop the use of
                  new methods, technologies, and systems
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'creativeAgility']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[6]}
                    onChange={(e) => onChange(6, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'creativeAgilityComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Leading Others</label>
                <label>
                  Candidate is able to manage own tasks and other's task. Able
                  to manage, monitor, provide feedback, and make decisions
                  appropriately
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'leadOthers']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[7]}
                    onChange={(e) => onChange(7, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'leadOthersComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Strategic Thinking</label>
                <label>
                  Candidate is able to predict various risk, opportunities and
                  take actions based on the organization's strategic plan
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'strategicThinking']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[8]}
                    onChange={(e) => onChange(8, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'strategicThinkingComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Reliable Partner</label>
                <label>
                  Candidate is able to adapt and collaborate with colleagues in
                  their own department and other departments
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'reliablePartner']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[9]}
                    onChange={(e) => onChange(9, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'reliablePartnerComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="fw-bold d-block">Technology Savvy</label>
                <label>
                  Candidate is able to use technology/systems to support work
                  processes
                </label>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="row">
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">1</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">2</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">3</label>
                    </div>
                    <div className="col-1 m-auto">
                      <label className="label-group-custom">4</label>
                    </div>
                  </div>
                </div>
                <Form.Item<FieldType>
                  name={['resultInfo', 'techSavvy']}
                  className="mb-0"
                >
                  <Radio.Group
                    className="d-flex justify-content-center align-items-center"
                    value={radioValues[10]}
                    onChange={(e) => onChange(10, e)}
                  >
                    <div className="row">
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={1}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={2}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={3}></Radio>
                      </div>
                      <div className="col-1 m-auto">
                        <Radio className="radio-custom" value={4}></Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="input-group-meta position-relative mb-15">
                <Form.Item<FieldType>
                  name={['resultInfo', 'techSavvyComment']}
                  className="mb-0"
                >
                  <TextArea
                    // value={jobDescValue}
                    // onChange={(e) => setJobDescValue(e.target.value)}
                    placeholder="Comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="col-6 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label className="d-block">
                  Score Total (Average total Score):
                </label>
                <label>{scoreTotal}</label>
              </div>
            </div>
            <div className="col-6 mt-3">
              <div className="input-group-meta position-relative mb-15">
                <label>Result for Position</label>
                <Form.Item<FieldType>
                  name={['resultInfo', 'interviewResult']}
                  className="mb-0"
                >
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="Hire">Hire</Radio.Button>
                    <Radio.Button value="Reject">Reject</Radio.Button>
                    <Radio.Button value="Keep in View">
                      Keep in View
                    </Radio.Button>
                    <Radio.Button value="Reschedule">Reschedule</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center mt-30 mb-0">
              <button type="submit" className="dash-btn-two tran3s me-3">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default InterviewResultArea;
