interface Experiences {
  job_title: string;
  start_at: Date;
  end_at: Date | null;
};

interface ReturnType {
  total_experiences_in_month: number;
  experiences_desc: string;
  latest_experience: string;
}

export function calculateExperiences({ experiences }: { experiences: Experiences[] }): ReturnType {
  /* Empty Experiences */
  if(experiences.length === 0) {
    return {
      total_experiences_in_month: 0,
      experiences_desc: 'Fresh Graduate',
      latest_experience: '-'
    };
  };

  let totalAllExperiencesInMonth = 0;
  let experiencesDescription: string;

  experiences.map(value => {
    /* Define years */
    const start_year = value.start_at.getFullYear();
    const start_month = value.start_at.getMonth();
    /* Define months */
    const end_year = value.end_at?.getFullYear() ?? 0;
    const end_month = value.end_at?.getMonth() ?? 0;
    /* Total years and months */
    let totalInYear = end_year - start_year;
    let totalInMonth = end_month - start_month;
    if(totalInYear <= 0) {
      totalAllExperiencesInMonth += totalInMonth;
    } else if (totalInYear > 1) {
      const _TOTALYEARINMONTH = totalInYear * 12;
      totalAllExperiencesInMonth += _TOTALYEARINMONTH + totalInMonth;
    } else if (totalInYear == 1) {
      const _TOTALYEARINMONTH = totalInYear * 12;
      totalAllExperiencesInMonth += _TOTALYEARINMONTH + totalInMonth;
    };
  });
  /* Count FINAL */
  const _FINALMONTH = totalAllExperiencesInMonth;
  const _FINALYEARS = Math.floor(totalAllExperiencesInMonth / 12);
  const _MONTHLEFT = totalAllExperiencesInMonth % 12;
  /* If not valid experiences date */
  if(_FINALMONTH <= 0) {
    experiencesDescription = 'Have experiences but invalid date';
    return {
      total_experiences_in_month: 0,
      experiences_desc: experiencesDescription,
      latest_experience: experiences[0].job_title
    };
  };
  /* FINAL check */
  if (_FINALYEARS == 0) {
    experiencesDescription = `Less than a year (${_FINALMONTH}) Months`;
  } else if (_FINALYEARS >= 1 && _MONTHLEFT == 0) {
    experiencesDescription = `${_FINALYEARS} Years`;
  } else {
    experiencesDescription = `${_FINALYEARS} Years ${_MONTHLEFT} Months`;
  };

  return {
    total_experiences_in_month: totalAllExperiencesInMonth,
    experiences_desc: experiencesDescription,
    latest_experience: experiences[0].job_title,
  };
};