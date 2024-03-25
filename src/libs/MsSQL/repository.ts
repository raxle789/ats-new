import CloudAppDataStore, { LocalAppDataStore } from ".";
import { Users } from "./Entity/users";

const UserRepository = CloudAppDataStore.getRepository(Users);

export { UserRepository };