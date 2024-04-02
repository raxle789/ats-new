// import { PositionLevels } from './entity/positionLevels';
// import { PositionLevelRequirementFields } from './entity/positionLevelRequirementFields';
// import { PositionLevelRequirements } from './entity/positionLevelRequirements';

// import { example_1 } from './entity/Test/exmaple_1';
import { cwd } from 'node:process';
import path from 'path';
// import { example_2 } from './entity/Test/exmaple_2';
import { Users } from './entity/users';
import { DocumentTypes } from './entity/documentTypes';
import { Certifications } from './entity/certifications';
import { Banks } from './entity/banks';
import { SkillTypes } from './entity/skillTypes';
import { EmergencyContacts } from './entity/emergencyContact';
import { Citys } from './entity/citys';
import { WorkingExperiences } from './entity/workingExperiences';
import { Candidates } from './entity/candidates';
import { Addresses } from './entity/address';
import { CandidatesDiseases } from './entity/candidatesDiseases';
import { Documents } from './entity/documents';
import { IdentityInfo } from './entity/identityInfo';
import { Sims } from './entity/sim';
import { Educations } from './entity/educations';
import { PositionLevels } from './entity/positionLevels';
import { PositionLevelRequirementFields } from './entity/positionLevelRequirementFields';
import { PositionLevelRequirements } from './entity/positionLevelRequirements';

// const config = {
//   server: '149.129.249.149',
//   database: 'ATS_ERAJAYA',
//   user: 'magang',
//   password: 'Erajaya123**',
//   options: {
//     encrypt: false,
//   },
// };

const config = {
  type: 'mssql',
  host: '149.129.249.149',
  port: 1433,
  username: 'magang',
  password: 'Erajaya123**',
  database: 'ATS_ERAJAYA',
  entities: [
    Users,
    Citys,
    IdentityInfo,
    Banks,
    EmergencyContacts,
    Addresses,
    Candidates,
    Educations,
    Documents,
    DocumentTypes,
    Certifications,
    WorkingExperiences,
    SkillTypes,
    CandidatesDiseases,
    Sims,
    PositionLevels,
    PositionLevelRequirementFields,
    PositionLevelRequirements,
  ],
  // entities: [
  //   PositionLevels,
  //   PositionLevelRequirementFields,
  //   PositionLevelRequirements,
  // ],
  synchronize: true,
  logging: true,
  pool: {
    min: 0,
    max: 20,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
  },
};

export default config;
