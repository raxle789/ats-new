import CloudAppDataStore, { isEstablished } from ".";
import { Users } from "./Entity/users";
/* Dependencies */
import bcrypt from 'bcrypt';

import { UserRepository } from "./repository";

export async function getUsersFromATS() {
    const users = await CloudAppDataStore.manager.find(Users);
    console.info(users);
    return users;
}

export async function getFatkhur() {
    await isEstablished('cloud');

    const user = await UserRepository.find();
    console.info(user);

    return user;
}

export async function migrateFromATS() {
    await isEstablished('cloud');

    const hash = await bcrypt.hash('fatiherajaya123', 10);

    const newUser = await UserRepository.create({
        name: 'Fatih Front-End Dev Erajaya',
        email: 'fatih.dev@erajaya.com',
        password: hash
    });

    const savingNewUser = await UserRepository.save(newUser);
    console.info('SAVING USER .....');
    console.info(savingNewUser);
}