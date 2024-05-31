import type { MasterData } from "@/app/components/forms/stage-3-form";
import { message } from "antd";

export async function fetchCities(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const cities = await fetch('/api/client-data/citys', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    const citiesData = await cities.json();
    setMasterData(prevState => ({
      ...prevState,
      citys: citiesData
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchEthnicity(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const ethnicity = await fetch('/api/client-data/ethnicity', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const ethnicityData = await ethnicity.json();
    setMasterData((prevState) => ({
      ...prevState,
      ethnicity: ethnicityData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchCountries(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const countries = await fetch('/api/client-data/countrys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const countriesData = await countries.json();
    setMasterData((prevState) => ({
      ...prevState,
      countries: countriesData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchEducationLevels(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const educationLevels = await fetch('/api/client-data/education/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const educationLevelsData = await educationLevels.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_levels: educationLevelsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchEducatioMajors(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const educationMajors = await fetch('/api/client-data/education/majors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const educationMajorsData = await educationMajors.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_majors: educationMajorsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchEducationInstitutios(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const institutions = await fetch(
      '/api/client-data/education/institutions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const institutionsData = await institutions.json();
    setMasterData((prevState) => ({
      ...prevState,
      education_institutions: institutionsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchCertificates(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const certifications = await fetch('/api/client-data/certifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const certificationsData = await certifications.json();
    setMasterData((prevState) => ({
      ...prevState,
      certificates_name: certificationsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchSkills(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const skills = await fetch('/api/client-data/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const skillsData = await skills.json();
    setMasterData((prevState) => ({
      ...prevState,
      skills: skillsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function fetchJobFunctions(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const jobFunctions = await fetch('/api/client-data/job/functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobFunctionsData = await jobFunctions.json();
    setMasterData((prevState) => ({
      ...prevState,
      job_functions: jobFunctionsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function jobJobLevels(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const levels = await fetch('/api/client-data/job/levels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jobLevelsData = await levels.json();
    setMasterData((prevState) => ({
      ...prevState,
      job_levels: jobLevelsData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};

export async function lineIndutries(setMasterData: React.Dispatch<React.SetStateAction<MasterData | null>>): Promise<void> {
  try {
    const lineIndustries = await fetch('/api/client-data/job/line-industries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const lineIndustriesData = await lineIndustries.json();
    setMasterData((prevState) => ({
      ...prevState,
      line_industries: lineIndustriesData,
    }));
  } catch (error) {
    if(error instanceof TypeError) {
      message.error(`${error.message}, cause: ${error.cause}`)
    };
  };
};
