'use server';

import moment from 'moment';

export async function calculateYearOfExperience(workingExperiences) {
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
            true,
          ) < 1
            ? 0
            : moment(endDate, 'YYYY-MM-DD').diff(
                moment(startDate, 'YYYY-MM-DD'),
                'years',
                true,
              ));
      } else {
        totalYearOfExperience = totalYearOfExperience + 0;
      }
    }

    return totalYearOfExperience;
  }

  return 0;
}
