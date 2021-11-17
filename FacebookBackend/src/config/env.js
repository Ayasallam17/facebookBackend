const env = {
    database: 'facebook',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    bcryptNum: 3  // small number to calculate fast it was slow with us
  };
module.exports = env;