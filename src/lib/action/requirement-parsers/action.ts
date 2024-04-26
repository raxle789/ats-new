'use server';

import {
  getEducationLevel,
  getPositionLevel,
  getLineIndustry,
} from '../../../app/services/requirement-parsers/service';

import {
  validateEducationLevel,
  validatePositionLevel,
  validateYearOfExperience,
  validateGrade,
  validateLineIndustry,
  validateSalary,
  validateArray,
  validateNumber,
} from './validation';

async function parseEducationLevel(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateNumber.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      return parsedValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validateEducationLevel.safeParse({
      valueToParse,
    });

    if (validate.success) {
      const parsedValue = await getEducationLevel(validate?.data?.valueToParse);

      return parsedValue;
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

async function parsePositionLevel(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateNumber.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      return parsedValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validatePositionLevel.safeParse({
      valueToParse,
    });

    if (validate.success) {
      const parsedValue = await getPositionLevel(validate?.data?.valueToParse);

      return parsedValue;
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

async function parseYearOfExperience(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateNumber.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      return parsedValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validateYearOfExperience.safeParse({
      valueToParse,
    });

    if (validate.success) {
      if (validate?.data?.valueToParse === 1) {
        return '1 year';
      } else {
        return `${validate?.data?.valueToParse} years`;
      }
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

async function parseGrade(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateNumber.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      return parsedValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validateGrade.safeParse({
      valueToParse,
    });

    if (validate.success) {
      return validate?.data?.valueToParse;
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

async function parseLineIndustry(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateArray.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      return parsedValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validateLineIndustry.safeParse({
      valueToParse,
    });

    if (validate.success) {
      const lineIndustries = validate?.data?.valueToParse;

      let parsedValue = '';

      if (lineIndustries.length <= 2) {
        for (let i = 0; i < lineIndustries.length; i++) {
          const lineIndustryValue = await getLineIndustry(lineIndustries[i]);

          if (i === lineIndustries.length - 2) {
            parsedValue = lineIndustryValue + ' and ';
          } else if (i === lineIndustries.length - 1) {
            parsedValue = parsedValue + lineIndustryValue;
          }
        }
      } else if (lineIndustries.length > 2) {
        for (let i = 0; i < lineIndustries.length; i++) {
          const lineIndustryValue = await getLineIndustry(lineIndustries[i]);

          if (i <= lineIndustries.length - 3) {
            parsedValue = parsedValue + lineIndustryValue + ', ';
          } else if (i === lineIndustries.length - 2) {
            parsedValue = parsedValue + lineIndustryValue + ', and ';
          } else if (i === lineIndustries.length - 1) {
            parsedValue = parsedValue + lineIndustryValue;
          }
        }
      }

      return parsedValue;
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

async function parseSalary(valueToParse, isOriginal = false) {
  if (isOriginal) {
    const validate = validateArray.safeParse({ value: valueToParse });

    if (validate.success) {
      const parsedValue = validate?.data?.value;

      const newValue = {
        start_salary: parsedValue[0],
        end_salary: parsedValue[1],
      };

      return newValue;
    } else {
      console.log(validate.error);

      return null;
    }
  } else {
    const validate = validateSalary.safeParse({ valueToParse });

    if (validate.success) {
      const value = validate?.data?.valueToParse;

      let parsedValue = '';

      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });

      if (value.length === 2) {
        for (let i = 0; i < value.length; i++) {
          if (i === value.length - 2) {
            parsedValue = parsedValue + formatter.format(value[i]) + ' - ';
          } else if (i === value.length - 1) {
            parsedValue = parsedValue + formatter.format(value[i]);
          }
        }
      }

      return parsedValue;
    } else {
      console.log(validate.error);

      return '';
    }
  }
}

module.exports = {
  parseEducationLevel,
  parsePositionLevel,
  parseYearOfExperience,
  parseGrade,
  parseLineIndustry,
  parseSalary,
};

// const hello = (name) => {
//   return `Hello World ${name}`;
// };

// const ayam = (name) => {
//   return `Ayam Goreng ${name}`;
// };

// const tahu = (name) => {
//   return `Tahu Goreng ${name}`;
// };

// const ayam2 = (name) => {
//   return `Ayam Bakar ${name}`;
// };

// module.exports = {
//   hello,
//   ayam,
//   tahu,
//   ayam2,
// };

// async function formatPositionLevelRequirementData(data) {
//   if (data?.data) {
//     await Promise.all(
//       data?.data?.map(async (a) => {
//         if (a?.positionLevelRequirements) {
//           await Promise.all(
//             a?.positionLevelRequirements?.map(async (d) => {
//               if (d?.value) {
//                 const parserFunctions = require('../requirement-parsers/action');

//                 const parserFunction =
//                   parserFunctions[
//                     d?.requirementFields?.requirmentFieldParsers?.name
//                   ];

//                 d.value = await parserFunction(d?.value);
//                 // if (
//                 //   d?.requirementFields?.name === 'education_level' ||
//                 //   d?.requirementFields?.name === 'job_level'
//                 // ) {
//                 //   if (d?.requirementFields?.name === 'education_level') {
//                 //     d.value = await getEducationLevel(Number(d?.value));
//                 //   } else if (d?.requirementFields?.name === 'job_level') {
//                 //     d.value = await getPositionLevel(Number(d?.value));
//                 //   }
//                 // } else if (
//                 //   d?.requirementFields?.name === 'line_industry' ||
//                 //   d?.requirementFields?.name === 'salary'
//                 // ) {
//                 //   if (d?.value?.includes('#')) {
//                 //     d.value = await formatData(d?.value, '#');
//                 //   } else if (d?.value?.includes('*')) {
//                 //     d.value = await formatData(d?.value, '*');
//                 //   }
//                 // }
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