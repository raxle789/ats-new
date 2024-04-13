import CloudAppDataStore, { LocalAppDataStore } from ".";
import { Candidates } from "./Entity/candidates";
import { Citys } from "./Entity/citys";
import { Documents } from "./Entity/documents";
import { Educations } from "./Entity/educations";
import { example_1 } from "./Entity/Test/exmaple_1";
import { example_2 } from "./Entity/Test/exmaple_2";
import { Users } from "./Entity/users";
import { WorkingExperiences } from "./Entity/workingExperiences";

const UserRepository = CloudAppDataStore.getRepository(Users);
const CandidatesRepository = CloudAppDataStore.getRepository(Candidates);
const CitysRepository = CloudAppDataStore.getRepository(Citys);
const EducationsRepository = CloudAppDataStore.getRepository(Educations);
const WorkingExperiencesRepository = CloudAppDataStore.getRepository(WorkingExperiences);
const DocumentRepository = CloudAppDataStore.getRepository(Documents);

const Example1 = CloudAppDataStore.getRepository(example_1);
const Example2 = CloudAppDataStore.getRepository(example_2);

export {
        UserRepository,
        CandidatesRepository,
        CitysRepository,
        EducationsRepository,
        WorkingExperiencesRepository,
        DocumentRepository,
        Example1, Example2
    };