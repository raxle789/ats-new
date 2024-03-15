interface User {
    id: string;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
};

const users: User[] = [
    {
        id: 'ats907658',
        name: 'Fatkhur Rozak',
        email: 'oujakdev.rep@gmail.com',
        password: 'Gudanggaram76#'
    },
];


export { users };