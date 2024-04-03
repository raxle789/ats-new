import CloudAppDataStore, { isEstablished } from ".";
import { Users } from "./Entity/users";
/* Dependencies */
import bcrypt from 'bcrypt';

import { Example1, Example2, UserRepository } from "./repository";
import { example_1 } from "./Entity/Test/exmaple_1";

export async function getUsersFromATS() {
    const users = await CloudAppDataStore.manager.find(Users);
    console.info(users);
    return users;
}

export async function getFatkhur() {

    await isEstablished('cloud');

    const user = await UserRepository.findOneBy({ id: 1 });
    console.info(user);

    return user;
}

export async function migrateFromATS() {
    await isEstablished('cloud');

    const example2ID = await Example2.findOneBy({
        id: 2
    });

    if(!example2ID) return null;

    // const newExample1 = new example_1();
    // newExample1.book_name = 'Idepad Guide';
    // newExample1.example_2 = example2ID;

    const newExample1 = Example1.create({
        book_name: 'Idepad Gen 4',
        example_2: example2ID,
    })

    console.info('Begin saving ...')
    const savingExample1 = await Example1.save(newExample1);
    console.info('The result saving: ', savingExample1);

    // const hash = await bcrypt.hash('danielerajaya123', 10);

    // const newUser = await UserRepository.create({
    //     name: 'Fatih Front-End Dev Erajaya',
    //     email: 'fatih.dev@erajaya.com',
    //     password: hash
    // });

    // const newUser = new Users();
    // newUser.name = 'Daniel Sulistio';
    // newUser.email = 'daniel.sulistio@gmail.com';
    // newUser.password = hash;
    // console.info('Begin saving to database:!');
    // const savingNewUser = await UserRepository.save(newUser);
    // console.info('SAVING USER .....');
    // console.info(savingNewUser);


}