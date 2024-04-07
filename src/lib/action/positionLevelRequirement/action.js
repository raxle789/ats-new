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
  getUser,
} from '../../../app/services/positionRequirement/service';
import { permanentRedirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ignore } from 'antd/es/theme/useToken';

export async function getAllPositionLevelRequirementData(offset, perPage) {
  const data = await getAllPositionLevelRequirement(offset, perPage);

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

  // await data?.data?.forEach(async (a) => {
  //   a?.positionLevelRequirements?.forEach(async (d) => {
  //     if (d?.value !== null && d?.value !== undefined && d?.value) {
  //       if (
  //         d?.requirementFields?.name === 'education_level' ||
  //         d?.requirementFields?.name === 'job_level'
  //       ) {
  //         if (d?.requirementFields?.name === 'education_level') {
  //           d.value = await getEducationLevel(Number(d?.value));
  //         } else if (d?.requirementFields?.name === 'job_level') {
  //           d.value = await getPositionLevel(Number(d?.value));
  //         }
  //       } else if (
  //         d?.requirementFields?.name === 'line_industry' ||
  //         d?.requirementFields?.name === 'salary'
  //       ) {
  //         if (d?.value?.includes('#')) {
  //           d.value = await formatData(d?.value, '#');
  //         } else if (d?.value?.includes('*')) {
  //           d.value = await formatData(d?.value, '*');
  //         }
  //       }
  //     }
  //   });
  // });

  return data;
}

export async function searchPositionLevelRequirementData(
  query,
  offset,
  perPage,
) {
  const data = await searchPositionLevelRequirement(query, offset, perPage);

  if (data?.data) {
    await Promise.all(
      data.data.map(async (a) => {
        if (a?.positionLevelRequirements) {
          await Promise.all(
            a.positionLevelRequirements.map(async (d) => {
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
            }),
          );
        }
      }),
    );
  }

  return data;
}

// export async function getUserData() {
//   const data = await getUser();

//   return data;
// }

function formatFieldName(fieldName) {
  const newFieldName = fieldName.split('_').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return newFieldName.join(' ');
}

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
          for (let i = 0; i < value.length; i++) {
            // const lineIndustryName = await getLineIndustry(value[i]);

            if (i < value.length - 1) {
              newValue = newValue + value[i] + '#';
            } else {
              newValue = newValue + value[i];
            }
          }
        } else if (key === 'salary') {
          newValue = `${value.start_salary}*${value.end_salary}`;
        }
      } else {
        newValue = value.toString();
      }
    }

    await setPositionLevelRequirement(
      positionLevelId,
      key,
      newValue.toString(),
    );
  }

  revalidatePath('/dashboard/ta/parameter');

  permanentRedirect('/dashboard/ta/parameter');
}

export async function getEducationLevelData(educationLevelId) {
  if (!isNaN(educationLevelId) && educationLevelId) {
    const data = await getEducationLevel(educationLevelId);

    return data;
  }

  return {};
}

export async function getPositionLevelData(positionLevelId) {
  if (!isNaN(positionLevelId) && positionLevelId) {
    const data = await getPositionLevel(positionLevelId);

    return data;
  }

  return {};
}

export async function getLineIndustryData(parsedValue) {
  if (Array.isArray(parsedValue) && parsedValue !== null) {
    for (let i = 0; i < parsedValue.length; i++) {
      parsedValue[i] = await getLineIndustry(parsedValue[i]);
    }

    return parsedValue.toString();
  }

  return '';
}
