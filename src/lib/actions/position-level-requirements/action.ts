'use server';

import {
  getAllPositionLevelRequirement,
  getAllPositionLevel,
  getAllEducationLevel,
  getAllLineIndustry,
  getPositionLevelRequirement,
  setPositionLevelRequirement,
  searchPositionLevelRequirement,
} from '../../services/position-level-requirements/service';
import * as crypto from '@/lib/utils/utils';
import _ from 'lodash';
// import * as parserFunctions from '../requirement-parsers/action';
import {
  validateForm,
  validatePositionLevelRequirementSchema,
} from './validation';
import { permanentRedirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// async function formatData(oldValue, identifier) {
//   const value = await oldValue.split(identifier);

//   let newValue = '';

//   if (identifier === '*') {
//     const formatter = new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//     });

//     if (value.length === 2) {
//       for (let i = 0; i < value.length; i++) {
//         if (i === value.length - 2) {
//           newValue = newValue + formatter.format(Number(value[i])) + ' - ';
//         } else if (i === value.length - 1) {
//           newValue = newValue + formatter.format(Number(value[i]));
//         }
//       }
//     }
//   } else if (identifier === '#') {
//     if (value[1] === '') {
//       const lineIndustryValue = await getLineIndustry(Number(value[0]));

//       newValue = `${lineIndustryValue}`;
//     } else if (value.length <= 2) {
//       for (let i = 0; i < value.length; i++) {
//         const lineIndustryValue = await getLineIndustry(Number(value[i]));

//         if (i === value.length - 2) {
//           newValue = lineIndustryValue + ' and ';
//         } else if (i === value.length - 1) {
//           newValue = newValue + lineIndustryValue;
//         }
//       }
//     } else if (value.length > 2) {
//       for (let i = 0; i < value.length; i++) {
//         const lineIndustryValue = await getLineIndustry(Number(value[i]));

//         if (i <= value.length - 3) {
//           newValue = newValue + lineIndustryValue + ', ';
//         } else if (i === value.length - 2) {
//           newValue = newValue + lineIndustryValue + ', and ';
//         } else if (i === value.length - 1) {
//           newValue = newValue + lineIndustryValue;
//         }
//       }
//     }
//   }

//   return newValue;
// }

function formatFieldName(fieldName) {
  const newFieldName = fieldName.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return newFieldName.join(' ');
}

// async function formatPositionLevelRequirementData(data) {
//   if (data?.data) {
//     await Promise.all(
//       data?.data?.map(async (a) => {
//         if (a?.positionLevelRequirements) {
//           await Promise.all(
//             a?.positionLevelRequirements?.map(async (d) => {
//               if (d?.value) {
//                 if (
//                   d?.requirementFields?.name === 'education_level' ||
//                   d?.requirementFields?.name === 'job_level'
//                 ) {
//                   if (d?.requirementFields?.name === 'education_level') {
//                     d.value = await getEducationLevel(Number(d?.value));
//                   } else if (d?.requirementFields?.name === 'job_level') {
//                     d.value = await getPositionLevel(Number(d?.value));
//                   }
//                 } else if (
//                   d?.requirementFields?.name === 'line_industry' ||
//                   d?.requirementFields?.name === 'salary'
//                 ) {
//                   if (d?.value?.includes('#')) {
//                     d.value = await formatData(d?.value, '#');
//                   } else if (d?.value?.includes('*')) {
//                     d.value = await formatData(d?.value, '*');
//                   }
//                 }
//               }

//               d.requirementFields.name = await formatFieldName(
//                 d?.requirementFields?.name,
//               );
//             }),
//           );
//         }
//       }),
//     );
//   }

//   return data;
// }

async function formatPositionLevelRequirementData(data) {
  // const line_industry = ['1', 2, '3', 4];

  // const validateData = validate.safeParse({ line_industry });

  // if (validateData.success) {
  //   console.info('Success');
  // } else {
  //   console.info(validateData.error);
  // }

  if (data?.data && data?.data?.length) {
    await Promise.all(
      data?.data?.map(async (a) => {
        if (a && !_.isEmpty(a)) {
          a.id = await crypto.encryptData(a?.id);
        }

        if (
          a?.positionLevelRequirements &&
          a?.positionLevelRequirements?.length
        ) {
          await Promise.all(
            a?.positionLevelRequirements?.map(async (d) => {
              if (d?.value !== null && d?.value !== undefined && d?.value) {
                const parserFunctions = require('../requirement-parsers/action');

                const parserFunction =
                  parserFunctions[
                    d?.requirementFields?.requirementFieldParsers?.name
                  ];

                d.value = await parserFunction(d?.value);
                // if (
                //   d?.requirementFields?.name === 'education_level' ||
                //   d?.requirementFields?.name === 'job_level'
                // ) {
                //   if (d?.requirementFields?.name === 'education_level') {
                //     d.value = await getEducationLevel(Number(d?.value));
                //   } else if (d?.requirementFields?.name === 'job_level') {
                //     d.value = await getPositionLevel(Number(d?.value));
                //   }
                // } else if (
                //   d?.requirementFields?.name === 'line_industry' ||
                //   d?.requirementFields?.name === 'salary'
                // ) {
                //   if (d?.value?.includes('#')) {
                //     d.value = await formatData(d?.value, '#');
                //   } else if (d?.value?.includes('*')) {
                //     d.value = await formatData(d?.value, '*');
                //   }
                // }
              }

              d.requirementFields.name = await formatFieldName(
                d?.requirementFields?.name,
              );
            }),
          );
        }
      }),
    );
  }

  return data;
}

export async function getAllPositionLevelRequirementData(offset, perPage) {
  // const myFunctions = require('../parse-requirements-value/action');

  // const myFunction = myFunctions['ayam2'];

  // console.info(myFunction('ayam'));

  const data = await getAllPositionLevelRequirement(offset, perPage);

  const newData = await formatPositionLevelRequirementData(data);

  return newData;
}

export async function searchPositionLevelRequirementData(
  query,
  offset,
  perPage,
) {
  const data = await searchPositionLevelRequirement(query, offset, perPage);

  const newData = await formatPositionLevelRequirementData(data);

  return newData;
}

export async function getPositionLevelRequirementData(positionLevelId) {
  // const ayam = '[1, 2, 3, 4';

  // const validation = validateArray.safeParse({ ayam });

  // if (validation.success) {
  //   console.info(validation.data.ayam);
  // } else {
  //   console.info(validation.error);
  // }

  // const ayam = '[1, 2, 3, 4]';

  // const tahu = JSON.parse(ayam);

  // console.info(tahu);

  const data = await getPositionLevelRequirement(positionLevelId);

  if (data && !_.isEmpty(data)) {
    data.id = crypto.encryptData(data?.id);

    await Promise.all(
      data?.positionLevelRequirements?.map(async (d) => {
        if (d?.value !== null && d?.value !== undefined && d?.value) {
          const parserFunctions = require('../requirement-parsers/action');

          const parserFunction =
            parserFunctions[
              d?.requirementFields?.requirementFieldParsers?.name
            ];

          d.value = await parserFunction(d?.value, true);

          // if (
          //   d?.requirementFields?.requirementFieldParsers?.name === 'salary'
          // ) {
          //   return {
          //     start_salary: d.value.start_salary,
          //   };
          // }
          // if (d?.requirementFields?.name === 'line_industry') {
          //   // if (d?.value?.includes('#')) {
          //   //   d.value = await d?.value
          //   //     ?.split('#')
          //   //     .filter((value) => value !== '')
          //   //     .map(Number);
          //   // } else if (d?.requirementFields?.name === 'salary') {
          //   //   d.value = await JSON.parse(d?.value);
          //   // }
          //   const validate = validateArray.safeParse({
          //     value: d?.value,
          //   });
          //   if (validate.success) {
          //     d.value = validate?.data?.value;
          //   } else {
          //     console.log(validate.error);
          //   }
          // } else if (d.requirementFields.name === 'salary') {
          //   const validate = validateSalary.safeParse({
          //     value: d?.value,
          //   });
          //   if (validate.success) {
          //     d.value = validate?.data?.value;
          //   } else {
          //     console.log(validate.error);
          //   }
          // } else {
          //   const validate = validateNumber.safeParse({
          //     value: d?.value,
          //   });
          //   if (validate.success) {
          //     d.value = validate?.data?.value;
          //   } else {
          //     console.log(validate.error);
          //   }
          // }
          // // if (
          // //   d?.requirementFields?.name === 'education_level' ||
          // //   d?.requirementField?.name === 'job_level'
          // // ) {
          // //   d.value = Number(d?.value);
          // // } else if (
          // //   d?.requirementFields?.name === 'line_industry' ||
          // //   d?.requirementFields?.name === 'salary'
          // // ) {
          // //   if (d?.value?.includes('#')) {
          // //     d.value = await d?.value?.split('#');
          // //   } else if (d.value.includes('*')) {
          // //     d.value = await d?.value?.split('*');
          // //   }
          // // } else if (
          // //   d?.requirementFields?.name === 'education_level' ||
          // //   d?.requirementFields?.name === 'job_level' ||
          // //   d?.requirementFields?.name === 'min_year_experience'
          // // ) {
          // //   d.value = Number(d?.value);
          // // }
        }
      }),
    );
  }

  return data;
}

export async function getAllPositionLevelData() {
  const data = await getAllPositionLevel();

  return data;
}

export async function getAllLineIndustryData() {
  const data = await getAllLineIndustry();

  return data;
}

export async function getAllEducationLevelData() {
  const data = await getAllEducationLevel();

  return data;
}

export async function setPositionLevelRequirementData(values) {
  const formValidation = validateForm.safeParse({ ...values, salary: [0, 0] });

  if (formValidation.success) {
    const positionLevelId = formValidation?.data?.positionLevelId;

    for (const [key, value] of Object?.entries(formValidation?.data)) {
      const newValue = JSON.stringify(value);

      // if (key !== 'positionLevelId') {
      //   if (
      //     key !== 'education_level' &&
      //     key !== 'grade' &&
      //     key !== 'job_level' &&
      //     key !== 'min_year_experience' &&
      //     key !== 'line_industry'
      //   ) {
      //     // if (key === 'line_industry') {
      //     //   newValue = JSON.stringify(value);
      //     //   // if (value.length === 1) {
      //     //   //   newValue = `${value[0]}#`;
      //     //   // } else if (value.length > 1) {
      //     //   //   newValue = value.join('#');
      //     //   // }
      //     //   // for (let i = 0; i < value.length; i++) {
      //     //   //   // const lineIndustryName = await getLineIndustry(value[i]);
      //     //   //   if (i < value.length - 1) {
      //     //   //     newValue = newValue + value[i] + '#';
      //     //   //   } else {
      //     //   //     newValue = newValue + value[i];
      //     //   //   }
      //     //   // }
      //     // }
      //     if (key === 'salary') {
      //       const { start_salary, end_salary } = value;

      //       newValue = JSON.stringify([start_salary, end_salary]);
      //     }
      //   } else {
      //     newValue = JSON.stringify(value);
      //   }
      // }

      const schemaValidation = validatePositionLevelRequirementSchema.safeParse(
        {
          positionLevelId,
          key,
          newValue,
        },
      );

      if (schemaValidation.success) {
        const response = await setPositionLevelRequirement(
          positionLevelId,
          key,
          newValue,
        );
      } else {
        console.log(schemaValidation.error);

        return {
          success: false,
          message:
            "Failed to Set Position Level's Requirements, Please Check Your Inputs",
        };
      }
    }

    return {
      success: true,
      message: "Successfully Set Position Level's Requirements",
    };
  } else {
    console.log(formValidation.error);

    return {
      success: false,
      message:
        "Failed to Set Position Level's Requirements, Please Check Your Inputs",
    };
  }
}

// export async function getEducationLevelData(educationLevelId) {
//   const validate = validateEducationLevelSchema.safeParse({
//     educationLevelId,
//   });

//   if (validate.success) {
//     const data = await getEducationLevel(educationLevelId);

//     return data;
//   } else {
//     console.log(validate.error);

//     return {};
//   }
// }

// export async function getPositionLevelData(positionLevelId) {
//   const validate = validatePositionLevelSchema.safeParse({
//     positionLevelId,
//   });

//   if (validate.success) {
//     const data = await getPositionLevel(positionLevelId);

//     return data;
//   } else {
//     console.log(validate.error);

//     return {};
//   }
// }

// export async function getLineIndustryData(parsedValue) {
//   const validate = validateLineIndustrySchema.safeParse({
//     lineIndustries: parsedValue,
//   });

//   if (validate.success) {
//     for (let i = 0; i < parsedValue.length; i++) {
//       parsedValue[i] = await getLineIndustry(parsedValue[i]);
//     }

//     return parsedValue.toString();
//   } else {
//     console.log(validate.error);

//     return '';
//   }
// }
