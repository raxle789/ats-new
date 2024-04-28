'use server';

import { getUserSession, setUserSession } from '../Sessions';
import { userRegister1 } from '../validations/Register';
import bcrypt from 'bcrypt';
import { fileToBase64, toDatetime, transformToArrayOfObject } from './utils';
import { v4 as uuidV4 } from 'uuid';
import { cookies } from 'next/headers';
import * as Utils from '../Sessions/utils';
import prisma from '@/root/prisma';
import { message } from 'antd';
import { info } from 'console';
import { create } from 'domain';

/**
 * @description Use Try-Catch to maximize handling storing data errors.
 * @param formData Object that contains fields of user's table.
 * @returns {object} Property "success" always true if operation was successful. Property "data" contains object of user-session value.
 */
export async function createUser(formData: any) {
  /* bycrypt hash with 10 salt-round */
  const hash = await bcrypt.hash(formData.password, 10);
  /* storing user-data */
  const user = await prisma.users.create({
    data: {
      name: formData.fullname,
      email: formData.email,
      password: hash,
    },
  });

  console.info('the result after submitting...', user);

  if (!user) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create user'],
      },
    };
  };

  console.info('create user successfully', user);
  /* create register-payload */
  const registerPayloadSession = {
    isCompleted: false,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };

  /* set-register session */
  await setUserSession('reg', registerPayloadSession, undefined);

  return {
    success: true,
    data: {
      user: registerPayloadSession.user
    },
  };
}

/**
 * @description Use Try-Catch to maximize handling storing data errors.
 * @param formData Object that contains fields of user's table.
 * @returns {object} Property "success" always true if operation was successful. Property "data" contains object of user-session value.
 */
export async function createCandidate(formData: any) {
  /* Get user-session data */
  const regSession = await getUserSession('reg');
  console.info('reg user-session', regSession);
  /* storing candidate-data */
  const candidate = await prisma.candidates.create({
    data: {
      userId: regSession.user.id,
      phone_number: formData.phoneNumber,
      date_of_birth: new Date(formData.dateOfBirth),
    },
  });

  console.info('the result after submitting...', candidate);

  if (!candidate) {
    return {
      success: false,
      message: {
        saveUser: ['failed to create candidate'],
      },
    };
  }

  console.info('create candidate successfully', candidate);
  /* create register-payload */
  const registerPayloadSession = {
    isCompleted: regSession.isCompleted,
    user: regSession.user,
    candidate: {
      id: candidate.id,
      phone_number: candidate.phone_number,
      date_of_birth: candidate.date_of_birth
    }
  };

  /* set register-session */
  await setUserSession('reg', registerPayloadSession, undefined);

  return {
    success: true,
    data: registerPayloadSession,
  };
}

export async function storeProfilePhoto(manipulatedPhotoFile: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data');
  /* Create additional document-property */
  const document = await prisma.documents.create({
    data: {
      saved_name: uuidV4(),
      original_name: manipulatedPhotoFile.original_name,
      byte_size: manipulatedPhotoFile.byte_size,
      path: 'no-path',
      file_base: Buffer.from(manipulatedPhotoFile.file_base),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      documentTypeId: 1,
      candidate_id: regSession.candidate.id
    }
  });
  console.info('Result after storing document...', document);
  if(!document) {
    return {
      success: false,
      message: 'Failed to store photo profile, try-again!'
    };
  };
  console.info('Store profile photo successfully', document);
  return {
    success: true,
    data: 'Success to store photo profile'
  };
};

/**
 * 
 * @param formData State of candidate input-data profile
 * @returns Object contains "success" and "message" properties if fails and return "success" and "data" properties is susccess.
 */
export async function updateCandidate(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Updating candidate data */
  const candidate = await prisma.candidates.update({
    where: {
      id: regSession.candidate.id
    },
    data: {
      blood_type: formData.bloodType,
      ethnicity: formData.ethnicity,
      gender: formData.gender,
      marital_status: formData.maritalStatus,
      /* Failed to insert, unsync with master data citys -> create view or db seed master city */
      // birthCityId: formData.profile.placeOfBirth, /* VALUE MUST BE THE ID OF CITYS */
      birthCity: formData.placeOfBirth,
      religion: formData.religion,
    }
  });
  console.info('Result after updating candidate data...', candidate);
  if(!candidate) {
    return {
      success: false,
      message: 'Failed to update candidate data, try again'
    };
  };
  console.info('Update candidate data successfully', candidate);
  return {
    success: true,
    data: candidate
  }
};

/**
 * 
 * @param formData State of candidate input-data Address
 * @param isCurrent Is the condition when the candidate current address same as the primary address.
 */
export async function storingAddress(formData: any, isCurrent: string | undefined) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * New Address Schema
   * id, street, country, city, zipCode, RT, RW, Subdistrict, Village, isCurrent, candidate-ID
   */
  /* Storing address */
  console.info('Begin store address data...');
  console.info('Checking the current address...');
  console.info('Is Current Address?...', isCurrent);
  if(isCurrent === "on") {
    console.info('Candidate has the same current address as the primary address...')
    /* Store 2 address data, one of them "isCurrent" property "true" */
    const currentAddress = await prisma.addresses.create({
      data: {
        candidate_id: regSession.candidate.id,
        street: formData.permanentAddress,
        country: formData.country,
        city: formData.city,
        zip_code: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        is_current: 'true',
        current_address: formData.currentAddress,
        created_at: new Date(Date.now())
      }
    });
    console.info('Result after storing address...', currentAddress);
    /* Guard check */
    if(!currentAddress) {
      return {
        success: false,
        message: 'Failed to storing address, try again'
      };
    };
    console.info('Storing address data successfully', currentAddress);
    return {
      success: true,
      data: currentAddress
    };
  };
  console.info('Candidate current address is different from the primary address...');
  /**
   * Store address data here
   */
  const address = await prisma.addresses.createMany({
    data: [
      {
        candidate_id: regSession.candidate.id,
        street: formData.permanentAddress,
        country: formData.country,
        city: formData.city,
        zip_code: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        is_current: 'false',
        created_at: new Date(Date.now())
      },
      {
        candidate_id: regSession.candidate.id,
        street: formData.currentAddress,
        country: formData.country,
        city: formData.city,
        zip_code: formData.zipCode,
        rt: formData.rt,
        rw: formData.rw,
        subdistrict: formData.subdistrict,
        village: formData.village,
        is_current: 'true',
        current_address: formData.currentAddress,
        created_at: new Date(Date.now())
      }
    ]
  });
  console.info('Resuult after storing address data...', address);
  /* Guard check */
  if(!address) {
    return {
      success: false,
      message: 'Failed to storing address-data, try again'
    }
  }
  console.info('Storing address data successfully...', address);
  return {
    success: true,
    data: address
  };
};

/**
 * 
 * @param formData State of candidate input-data Familys
 */
export async function storeFamilys(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * New Familys Schema
   * id, name, gender, dateOfBirth, relationStatus, candidate-ID
   */
  /* Checking familys data length */
  console.info('Begin to store familys data...');
  const familyList = transformToArrayOfObject(formData);
  console.info('Transformed family list', familyList);
  /**
   * Transform nested object to array of object
   * transformToArrayOfObject(formData.families)
   */
  let manipulatedFamily: any[] = [];
  familyList.forEach((value: any) => {
    const familys = {
      candidate_id: regSession.candidate.id,
      name: value.name,
      /* UBAH GENDER ID JADI GENDER NCARCHAR */
      gender: value.gender, // change from gender_id to gender
      date_of_birth: value.dateOfBirth,
      relationStatus: value.relation,
      created_at: new Date(Date.now())
    };
    /* Store to defined empty array */
    if(familys.name === undefined) {
      return;
    } else {
      manipulatedFamily.push(familys);
    }
  });
  /**
   * Store multiple records using prisma.
   * await prisma.createMany()
   */
  const familys = await prisma.families.createMany({
    data: manipulatedFamily
  });
  console.info('Result after storing familys data...', familys);
  /* Guard check */
  if(!familys) {
    return {
      success: false,
      message: 'Failed to store family-data, try again'
    };
  };
  console.info('Storing familys data successfully...', familys);
  return {
    success: true,
    data: familys
  };
};

/**
 * 
 * @param formData State of candidate input-data Education
 * @summary Done Fixed
 */
export async function storeEducation(formData: any, startyear: number, endYear: number, isFormal: string | undefined) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data');
  /* Storing Education */
  if(isFormal === "on") {
    console.info('Begin storing education data...');
    const education = await prisma.educations.create({
      data: {
        candidateId: regSession.candidate.id,
        level: formData.educationLevel,
        major: formData.educationMajor[0],
        start_year: startyear,
        end_year: endYear,
        university_name: formData.schoolName[0],
        city_of_school: formData.cityOfSchool,
        gpa: formData.gpa,
        is_latest: false,
        is_graduate: false,
        created_at: new Date(Date.now())
      }
    });
    console.info('Result after storing education data...', education);
    /* Guard check */
    if(!education) {
      return {
        success: false,
        message: 'Failed to store education-data'
      };
    };
    console.info('Storing education data successfully...', education);
    return {
        success: true,
        data: education
    };
  };
  return {
    success: true,
    data: 'Formal checkbox unchecked, no-store education'
  };
};

/**
 * 
 * @param formData State of candidate input-data certifications
 * @returns 
 * @summary Done Fixed
 */
export async function storeCertification(formData: any, month: number, year: number, isCertificates: string | undefined) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Storing  certification */
  console.info('Begin to maipulating certification data...');
  if(isCertificates === "on") {
    /**
     * New Certificates Schema
     * id, name, institution, issuedData, candidate-ID
     */
    /* Transform to array of object */
    const certificationList = transformToArrayOfObject(formData);
    let manipulatedCertifications: any[] = [];
    certificationList.forEach(value => {
      const certification = {
        candidate_id: regSession.candidate.id,
        certificate_id: Number(value.certificationName[0]),
        institution_name: value.institution,
        issued_date: new Date(month, year),
        created_at: new Date(Date.now())
      };
      /* Store to defined empty array */
      manipulatedCertifications.push(certification);
    });
    console.info('Manipulated certifications...', manipulatedCertifications)
    console.info('Begin to storing certification data...');
    /* Store certifications here */
    const certifications = await prisma.certifications.createMany({
      data: manipulatedCertifications
    });
    console.info('Result after store certifications...', certifications);
    if(!certifications) {
      return {
        success: false,
        message: 'Failed to store certification data, try again'
      };
    };
    console.info('Storing certifications successfully...', certifications);
    return {
      success: true,
      data: certifications
    };
  };
  return {
    success: true,
    data: 'Certificates checkbox unchecked'
  }
};

/**
 * 
 * @param formData State of candidate input-data skills.
 * @summary Done Fixed
 */
export async function storeSkills(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /**
   * Store to candidate-skills table.
   * 
   */
  console.log('Begin manipulating skills data...');
  let manipulatedSkills: any[] = [];
  const skillList: any[] = formData;
  skillList.forEach(value => {
    const skill = {
      candidate_id: regSession.candidate.id,
      skill_id: value
    };
    /* Store manipulated data to empty array */
    manipulatedSkills.push(skill);
  });
  console.info('Manipulated skills data...', manipulatedSkills);
  console.info('Begin store skills data...');
  const skills = await prisma.candidate_skills.createMany({
    data: manipulatedSkills
  });
  /* Guard check */
  if(!skills) {
    return {
      success: false,
      message: 'Failed to store skills data, try again'
    };
  }
  console.info('Result after storing skills data...', skills);
  return {
    success: true,
    data: skills
  };
};

/**
 * 
 * @param formData State of candidate input-data language
 * @returns 
 */
export async function storeLanguage(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store Language data */
  console.info('Begin manipulating language data...');
  const languageList = transformToArrayOfObject(formData);
  let manipulatedLanguage: any[] = [];
  languageList.forEach(value => {
    const language = {
      candidate_id: regSession.candidate.id,
      name: value.name,
      level: value.level,
      created_at: new Date(Date.now())
    };
    /* Store value to defined empty array */
    manipulatedLanguage.push(language);
  });
  console.info('Manipulated language data...', manipulatedLanguage);
  console.info('Begin to store Language data...');
  /**
   * Store language using prisma
   * Guard check
   * return the value
   */
  const language = await prisma.languages.createMany({
    data: manipulatedLanguage
  });
  console.info('Result after storing language data...', language);
  /* Guard check */
  if(!language) {
    return {
      success: false,
      message: 'Failed to store skills data, try again'
    };
  };
  console.info('Storing language data successfully...', language);
  return {
    success: true,
    data: language
  };
};

export async function storeExperiences(formData: any, isExperienced: string) {
  /* Getting reg-session data */
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  if(isExperienced === "Professional") {
    /* Begin to store Experience data */
    const experienceList: any[] = transformToArrayOfObject(formData);
    console.info('LENGTH', experienceList.length);
    let manipulatedExperienceList: any[] = [];
    experienceList.forEach(value => {
      const experience = {
        candidateId: regSession.candidate.id,
        job_title: value.jobTitle,
        job_function: value.jobFunction,
        line_industry: value.lineIndustry,
        job_level: value.positionLevel,
        company_name: value.compName,
        job_description: value.jobDesc,
        salary: value.currentSalary,
        start_at: value.startYear,
        end_at: value.endYear,
        is_currently: value.currentYear === "on" ? true : false,
        created_at: new Date(Date.now())
      };
      if(experience.job_title === undefined) {
        return;
      }else {
        manipulatedExperienceList.push(experience);
      };
    });
    console.info('manipulated experience list result', manipulatedExperienceList)
    console.info('Begin to store Experience data...');
    const experience = await prisma.working_experiences.createMany({
      data: manipulatedExperienceList
    });
    console.info('Result after storing experience...', experience);
    /* Guard check */
    if(!experience) {
      return {
        success: false,
        message: 'Failed to store experience, try again'
      };
    };
    console.info('Storing experience data successfully...', experience);
    /* Updating expected-salary data */
    console.info('Begin updating expected-salary data...');
    const candidate = await prisma.candidates.update({
      where: {
        id: regSession.candidate.id
      },
      data: {
        current_salary: Number(formData.expectedSalary)
      }
    });
    console.info('Result after updating expected-salary data...', candidate);
    /* Guard check */
    if(!candidate) {
      return {
        success: false,
        message: 'Failed to update expected-salary data, try again'
      };
    };
    console.info('Updating expected-salary data successfully...', candidate);
    return {
      success: true,
      data: experience
    };
  } else if(isExperienced === "Fresh Graduate") {
    console.info('Begin updating expected-salary data...');
    const candidate = await prisma.candidates.update({
      where: {
        id: regSession.candidate.id
      },
      data: {
        current_salary: Number(formData.expectedSalary)
      }
    });
    /* Guard check */
    if(!candidate) {
      return {
        success: false,
        message: 'Failed to update expected-salary data, try again'
      };
    };
    console.info('Updating expected-salary data successfully...', candidate);
    return {
      success: true,
      data: candidate
    };
  };
  return {
    success: true,
    message: 'No operation performed!'
  };
};

export async function storeEmergencyContact(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store Emergency contact-data */
  console.info('Begin to store emergency contact...');
  const emergencyContact = await prisma.emergency_contacts.create({
    data: {
      phone_number: formData.emergencyContactPhoneNumber,
      name: formData.emergencyContactName,
      relation_status: formData.emergencyContactRelation
    }
  });
  console.info('Result after store emergency contact...', emergencyContact);
  if(!emergencyContact) {
    return {
      success: false,
      message: 'Failed to store emergency contact'
    };
  };
  console.info('Storing emergency contact successfully', emergencyContact);
  /* Updating emergency contact-ID */
  return {
    success: true,
    data: emergencyContact
  };
};

/**
 * 
 * @param formData State of candidate input-data question answer.
 */
export async function storeCandidateQuestions(formData: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data', regSession);
  /* Begin to store candidate-questions data */
  console.info('Begin to store candidate-questions data...');
  const candidateQuestions = await prisma.candidateQuestions.createMany({
    data: [
      {
        candidateId: regSession.candidate.id,
        questionId: 1,
        answer: formData.noticePeriod,
        created_at: new Date(Date.now())
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 2,
        answer: [formData.everWorkedMonth, formData.everWorkedYear].toString(),
        created_at: new Date(Date.now())
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 3,
        answer: [formData.diseaseName, formData.diseaseYear].toString(),
        created_at: new Date(Date.now())
      },
      {
        candidateId: regSession.candidate.id,
        questionId: 4,
        answer: [formData.relationName, formData.relationPosition].toString(),
        created_at: new Date(Date.now())
      }
    ]
  });
  console.info('Result after storing candidate-question data...', candidateQuestions);
  /* Guard check */
  if(!candidateQuestions) {
    return {
      success: false,
      message: 'Failed to store candidate-question data, try again'
    };
  };
  console.info('Storing candidate-question data...', candidateQuestions);
  return {
    success: true,
    data: candidateQuestions
  };
};

export async function storeCurriculumVitae(manipulatedCurriculumVitae: any) {
  const regSession = await getUserSession('reg');
  console.info('reg-session-data');
  /* Create additional document-property */
  console.info('Begin to store curriculum vitae documen...');
  const document = await prisma.documents.create({
    data: {
      saved_name: uuidV4(),
      original_name: manipulatedCurriculumVitae.original_name,
      byte_size: manipulatedCurriculumVitae.byte_size,
      path: 'no-path',
      file_base: Buffer.from(manipulatedCurriculumVitae.file_base),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
      documentTypeId: 2,
      candidate_id: regSession.candidate.id
    }
  });
  console.info('Result after storing curriculum vitae document...', document);
  /* Guard check */
  if(!document) {
    return {
      success: false,
      message: 'Failed to store curriculum-vitae document, try again'
    };
  };
  console.info('Store curriculum-vitae document successfully...', document);
  return {
    success: true,
    data: 'Success store CV'
  };
};

/* NOT USED */

// export async function createEducation_Experience(
//   formData: any,
//   document: any,
//   agreement: boolean,
// ) {
//   /* get reg-session */
//   const regSession = await getUserSession('reg');
//   console.log(regSession);

//   const education = await prisma.educations.create({
//     data: {
//       candidateId: regSession.candidate_id,
//       level: formData.education.level,
//       major: formData.education.major,
//       university_name: formData.education.university_name,
//       start_year: Number(formData.education.start_year),
//       end_year: Number(formData.education.end_year),
//       gpa: parseFloat(formData.education.gpa),
//       // language: 'Indonesian',
//       is_latest: false,
//       is_graduate: false,
//     },
//   });

//   console.log(education);
//   if (!education) {
//     return {
//       success: false,
//       message: {
//         saveEducation: ['failed to create education'],
//       },
//     };
//   }

//   const experience = await prisma.working_experiences.create({
//     data: {
//       candidateId: regSession.candidate_id,
//       company_name: formData.experience.company_name,
//       job_function: formData.experience.job_function,
//       job_title: formData.experience.job_title,
//       job_level: formData.experience.job_level,
//       job_description: '',
//       line_industry: formData.experience.line_industry,
//       start_at: new Date(formData.experience.start_at), // looks must be converted to Date
//       end_at: new Date(formData.experience.end_at), // looks must be converted to Date
//       salary: Number(formData.experience.salary),
//       is_currently: false,
//     },
//   });

//   console.log(experience);
//   if (!experience) {
//     return {
//       success: false,
//       message: {
//         saveExperience: ['failed to create experience!'],
//       },
//     };
//   }

//   const documenUUID: string = uuidV4();
//   const binaryData = Buffer.from(document.file_base, 'base64');
//   const userDocument = await prisma.documents.create({
//     data: {
//       saved_name: documenUUID,
//       original_name: document.name,
//       byte_size: document.size,
//       path: 'no-path',
//       file_base: binaryData,
//       candidate_id: regSession.candidate_id,
//     },
//   });

//   console.log(userDocument);
//   if (!userDocument) {
//     return {
//       success: false,
//       message: {
//         saveDocument: ['failed to create document!'],
//       },
//     };
//   }

//   /* delete reg-session */
//   cookies().delete(Utils.regSession);
//   /* set auth-session */
//   await setUserSession(
//     'auth',
//     { user_id: regSession.id, candidate_id: regSession.candidate_id },
//     undefined,
//   );

//   return {
//     success: true,
//     message: {
//       createAccount: ['Create account successfully!'],
//     },
//   };
// }
