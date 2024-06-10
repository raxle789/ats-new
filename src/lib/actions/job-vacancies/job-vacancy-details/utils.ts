'use server';

import moment from 'moment';
import _ from 'lodash';

export async function calculateYearOfExperience(workingExperiences) {
  // console.info(workingExperiences);

  let totalYearOfExperience = 0;

  if (workingExperiences?.length) {
    for (let i = 0; i < workingExperiences?.length; i++) {
      const startDate = workingExperiences[i]?.start_at;

      const endDate = workingExperiences[i]?.end_at;

      if (moment(startDate).isValid() && moment(endDate).isValid()) {
        totalYearOfExperience =
          totalYearOfExperience +
          (moment(endDate, 'YYYY-MM-DD').diff(
            moment(startDate, 'YYYY-MM-DD'),
            'years',
          ) < 1
            ? 0
            : moment(endDate, 'YYYY-MM-DD').diff(
                moment(startDate, 'YYYY-MM-DD'),
                'years',
              ));
      } else if (moment(startDate).isValid() && !moment(endDate).isValid()) {
        totalYearOfExperience =
          totalYearOfExperience +
          (moment().diff(moment(startDate, 'YYYY-MM-DD'), 'years') < 1
            ? 0
            : moment().diff(moment(startDate, 'YYYY-MM-DD'), 'years'));
      } else {
        totalYearOfExperience = totalYearOfExperience + 0;
      }
    }

    return totalYearOfExperience;
  }

  return null;
}

export async function getLastPosition(workingExperiences) {
  let lastPosition = '';

  if (workingExperiences?.length) {
    for (let i = 0; i < workingExperiences?.length; i++) {
      const endDate = workingExperiences[i]?.end_at;

      if (moment(endDate).isValid()) {
        if (i === 0) {
          lastPosition = workingExperiences[i]?.job_title;
        } else {
          const endDateBefore = workingExperiences[i - 1]?.end_at;

          if (moment(endDateBefore).isValid()) {
            if (
              moment(endDate, 'YYYY-MM-DD').isAfter(
                moment(endDateBefore, 'YYYY-MM-DD'),
              )
            ) {
              lastPosition = workingExperiences[i]?.job_title;
            }
          }
        }
      }
    }

    return lastPosition;
  }

  return null;
}

export async function getTestByLevel(positionLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
  switch (positionLevel) {
    case 1:
      return 39;
    case 2:
      return 41;
    case 3:
      return 40;
    case 4:
      return 85;
    case 5:
      return 81;
    case 6:
      return 81;
    case 7:
      return 81;
  }
}

export async function convertObjectToFormData(value) {
  const formData = new FormData();

  for (const key in value) {
    formData.append(key, value[key]);
  }

  return formData;
}

export async function calculateAge(dateOfBirth) {
  if (
    moment(dateOfBirth).isValid() &&
    moment(dateOfBirth, 'YYYY-MM-DD').isBefore(moment())
  ) {
    const age = moment().diff(moment(dateOfBirth, 'YYYY-MM-DD'), 'years');

    return age;
  }

  return 0;
}

export async function formatInterviewResultSchema(data) {
  const mainData = { ...data };

  const categoryData = [];

  for (const [key, value] of Object.entries(mainData)) {
    if (
      key !== 'candidateId' &&
      key !== 'jobVacancyId' &&
      key !== 'interviewId' &&
      key !== 'interviewerNik' &&
      key !== 'status' &&
      key !== 'reason' &&
      key !== 'rescheduler'
    ) {
      if (
        key?.toLowerCase()?.endsWith('rate') ||
        key?.toLowerCase()?.endsWith('comment')
      ) {
        let categoryDataItem = {};

        const categoryName = _.startCase(key?.replace(/Rate$|Comment$/g, ''));

        const isExist = categoryData?.find(
          (item) => item?.categoryName === categoryName,
        );

        if (
          isExist &&
          isExist.hasOwnProperty('score') &&
          !isExist.hasOwnProperty('comment')
        ) {
          categoryDataItem = {
            ...isExist,
            comment: value,
          };

          categoryData?.splice(
            categoryData?.indexOf(isExist),
            1,
            categoryDataItem,
          );
        } else if (
          isExist &&
          !isExist.hasOwnProperty('score') &&
          isExist.hasOwnProperty('comment')
        ) {
          categoryDataItem = {
            ...isExist,
            score: value,
          };

          categoryData?.splice(
            categoryData?.indexOf(isExist),
            1,
            categoryDataItem,
          );
        } else {
          if (!isExist && key?.toLowerCase()?.endsWith('rate')) {
            categoryDataItem = {
              ...isExist,
              categoryName,
              score: value,
            };

            categoryData?.push(categoryDataItem);
          } else if (!isExist && key?.toLowerCase()?.endsWith('comment')) {
            categoryDataItem = {
              ...isExist,
              categoryName,
              comment: value,
            };

            categoryData?.push(categoryDataItem);
          }
        }

        // if (!isExist) {
        //   data?.push(categoryData);
        // } else {

        // const newData = data?.reduce(
        //   (acc, cur) => {
        //     if (
        //       acc?.findIndex(
        //         (item) => item?.categoryName === categoryName,
        //       ) !== -1 &&
        //       key?.toLowerCase()?.endsWith('rate')
        //     ) {
        //       return acc?.map((item) => {
        //         if (item?.categoryName === categoryName) {
        //           return { ...item, score: value };
        //         } else {
        //           return item;
        //         }
        //       });
        //     } else if (
        //       acc?.findIndex(
        //         (item) => item?.categoryName === categoryName,
        //       ) !== -1 &&
        //       key?.toLowerCase()?.endsWith('comment')
        //     ) {
        //       return acc?.map((item) => {
        //         if (item?.categoryName === categoryName) {
        //           return { ...item, comment: value };
        //         } else {
        //           return item;
        //         }
        //       });
        //     } else {
        //       if (key?.toLowerCase()?.endsWith('rate')) {
        //         return [...acc, { ...cur, categoryName, score: value }];
        //       } else if (key?.toLowerCase()?.endsWith('comment')) {
        //         return [
        //           ...acc,
        //           { ...cur, categoryName, comment: value },
        //         ];
        //       }
        //     }
        //   },
        //   [{ categoryName: '', score: 0, comment: '' }],
        // );

        // data = [...data, ...newData];

        // }
      }

      delete mainData[key];
    }
  }

  return { mainData, categoryData };
}
