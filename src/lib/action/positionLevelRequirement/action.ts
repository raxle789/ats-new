'use server';

import {
  getAllPositionLevelRequirement,
  getLineIndustry,
  getPositionLevel,
  getEducationLevel,
  getAllPositionLevel,
  getAllEducationLevel,
  getAllLineIndustry,
  getPositionLevelRequirement,
  setPositionLevelRequirement,
  searchPositionLevelRequirement,
} from '../../../app/services/positionRequirement/service';
import { validatePositionLevelRequirementSchema } from './validation';
import { permanentRedirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function formatData(oldValue, identifier) {
  const value = await oldValue.split(identifier);

  let newValue = '';

  if (identifier === '*') {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    if (value.length === 2) {
      for (let i = 0; i < value.length; i++) {
        if (i === value.length - 2) {
          newValue = newValue + formatter.format(Number(value[i])) + ' - ';
        } else if (i === value.length - 1) {
          newValue = newValue + formatter.format(Number(value[i]));
        }
      }
    }
  } else if (identifier === '#') {
    if (value.length === 2) {
      for (let i = 0; i < value.length; i++) {
        const lineIndustryValue = await getLineIndustry(Number(value[i]));

        if (i === value.length - 2) {
          newValue = lineIndustryValue + ' and ';
        } else if (i === value.length - 1) {
          newValue = newValue + lineIndustryValue;
        }
      }
    } else if (value.length > 2) {
      for (let i = 0; i < value.length; i++) {
        const lineIndustryValue = await getLineIndustry(Number(value[i]));

        if (i <= value.length - 3) {
          newValue = newValue + lineIndustryValue + ', ';
        } else if (i === value.length - 2) {
          newValue = newValue + lineIndustryValue + ', and ';
        } else if (i === value.length - 1) {
          newValue = newValue + lineIndustryValue;
        }
      }
    }
  }

  return newValue;
}

function formatFieldName(fieldName) {
  const newFieldName = fieldName.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return newFieldName.join(' ');
}

async function formatPositionLevelRequirementData(data) {
  if (data?.data) {
    await Promise.all(
      data?.data?.map(async (a) => {
        if (a?.positionLevelRequirements) {
          await Promise.all(
            a?.positionLevelRequirements?.map(async (d) => {
              if (d?.value) {
                if (
                  d?.requirementFields?.name === 'education_level' ||
                  d?.requirementFields?.name === 'job_level'
                ) {
                  if (d?.requirementFields?.name === 'education_level') {
                    d.value = await getEducationLevel(Number(d?.value));
                  } else if (d?.requirementFields?.name === 'job_level') {
                    d.value = await getPositionLevel(Number(d?.value));
                  }
                } else if (
                  d?.requirementFields?.name === 'line_industry' ||
                  d?.requirementFields?.name === 'salary'
                ) {
                  if (d?.value?.includes('#')) {
                    d.value = await formatData(d?.value, '#');
                  } else if (d?.value?.includes('*')) {
                    d.value = await formatData(d?.value, '*');
                  }
                }
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
  const data = await getPositionLevelRequirement(positionLevelId);

  if (data) {
    await Promise.all(
      data?.positionLevelRequirements?.map(async (d) => {
        if (d?.value !== null && d?.value !== undefined && d?.value) {
          if (
            d?.requirementFields?.name === 'line_industry' ||
            d?.requirementFields?.name === 'salary'
          ) {
            if (d?.value?.includes('#')) {
              d.value = await d?.value?.split('#').map(Number);
            } else if (d?.value?.includes('*')) {
              d.value = await d?.value?.split('*').map(Number);
            }
          } else {
            d.value = Number(d?.value);
          }

          // if (
          //   d?.requirementFields?.name === 'education_level' ||
          //   d?.requirementField?.name === 'job_level'
          // ) {
          //   d.value = Number(d?.value);
          // } else if (
          //   d?.requirementFields?.name === 'line_industry' ||
          //   d?.requirementFields?.name === 'salary'
          // ) {
          //   if (d?.value?.includes('#')) {
          //     d.value = await d?.value?.split('#');
          //   } else if (d.value.includes('*')) {
          //     d.value = await d?.value?.split('*');
          //   }
          // } else if (
          //   d?.requirementFields?.name === 'education_level' ||
          //   d?.requirementFields?.name === 'job_level' ||
          //   d?.requirementFields?.name === 'min_year_experience'
          // ) {
          //   d.value = Number(d?.value);
          // }
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
  const positionLevelId = Number(values?.positionLevelId);

  for (const [key, value] of Object?.entries(values)) {
    let newValue = '';

    if (key !== 'positionLevelId') {
      if (
        key !== 'education_level' &&
        key !== 'grade' &&
        key !== 'job_level' &&
        key !== 'min_year_experience'
      ) {
        if (key === 'line_industry') {
          newValue = value.join('#');
          // for (let i = 0; i < value.length; i++) {
          //   // const lineIndustryName = await getLineIndustry(value[i]);
          //   if (i < value.length - 1) {
          //     newValue = newValue + value[i] + '#';
          //   } else {
          //     newValue = newValue + value[i];
          //   }
          // }
        } else if (key === 'salary') {
          newValue = `${value.start_salary}*${value.end_salary}`;
        }
      } else {
        newValue = value.toString();
      }
    }

    const validate = await validatePositionLevelRequirementSchema.safeParse({
      positionLevelId,
      key,
      newValue,
    });

    if (validate.success) {
      await setPositionLevelRequirement(
        positionLevelId,
        key,
        newValue.toString(),
      );
    } else {
      console.log(validate.error);

      break;
    }
  }

  revalidatePath('/dashboard/ta/parameter');

  permanentRedirect('/dashboard/ta/parameter');
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