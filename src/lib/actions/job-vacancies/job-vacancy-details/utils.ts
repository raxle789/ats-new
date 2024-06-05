'use server';

import moment from 'moment';

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
