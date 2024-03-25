import path from 'node:path';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from './Entity/users';
import { DocumentTypes } from './Entity/documentTypes';
import { Certifications } from './Entity/certifications';
import { Banks } from './Entity/banks';
import { SkillTypes } from './Entity/skillTypes';
import { EmergencyContacts } from './Entity/emergencyContact';
import { Citys } from './Entity/citys';
import { WorkingExperiences } from './Entity/workingExperiences';
import { Candidates } from './Entity/candidates';
import { Addresses } from './Entity/address';
import { CandidatesDiseases } from './Entity/candidatesDiseases';
import { Documents } from './Entity/documents';
import { IdentityInfo } from './Entity/identityInfo';
import { Sims } from './Entity/sim';
import { example_1 } from './Entity/Test/exmaple_1';
import { example_2 } from './Entity/Test/exmaple_2';
import { Educations } from './Entity/educations';

const LocalAppDataStore = new DataSource({
    type: 'mssql',
    host: 'LAPTOP-LIQRC6F7',
    port: 1433,
    username: 'atsphase2',
    password: 'gudanggaram76',
    database: 'atserajaya',
    entities: [Users],
    synchronize: true,
    logging: true,
    pool: {
        min: 0,
        max: 20,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false
    },
    requestTimeout: 20000
});

/* Initialize Local Connection */
// LocalAppDataStore.initialize().then((connection) => {
//     console.info('IS LOCAL MS SQL SERVER CONNECTED: ', connection.isInitialized);
// }).catch((error) => {
//     console.info('ERROR OCCURED ON CLOUD SQL SERVER: ', error);
//     console.info(error);
// });

const CloudAppDataStore = new DataSource({
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
        example_2,
        example_1,
    ],
    synchronize: true,
    logging: false,
    pool: {
        min: 0,
        max: 20,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false
    }
});

/* Initialize Cloud Connection */
// CloudAppDataStore.initialize()
//     .then((connection) => {
//     console.info('IS CLOUD MS SQL SERVER CONNECTED: ', connection.isInitialized);
//     }).catch((error) => {
//     console.info('ERROR OCCURED ON CLOUD SQL SERVER: ', error);
// });

console.info('direktori index: ', __dirname);

/* Checking Up Connection */
export async function isEstablished(onServer?: 'local' | 'cloud'): Promise<void> {
    switch (onServer) {
        case 'local':
            if (!LocalAppDataStore.isInitialized) {
                await LocalAppDataStore.initialize();
            }
            break;
        case 'cloud':
            if (!CloudAppDataStore.isInitialized) {
                await CloudAppDataStore.initialize()
            }
            break;
        default:
            console.info('NO CONNECTION TO CHECK!')
            break;
    };
};

export { LocalAppDataStore };
export default CloudAppDataStore;
