const config = {
  server: '149.129.249.149',
  database: 'ATS_ERAJAYA',
  user: 'magang',
  password: 'Erajaya123**',
  options: {
    encrypt: false,
  },
};

// const config = {
//   type: 'mssql',
//   host: '149.129.249.149',
//   port: 1433,
//   username: 'magang',
//   password: 'Erajaya123**',
//   database: 'ATS_ERAJAYA',
//   entities: [__dirname + '/entity/*{.js, .ts}'],
//   synchronize: true,
//   logging: false,
//   pool: {
//     min: 0,
//     max: 20,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     encrypt: false,
//   },
// };

export default config;
