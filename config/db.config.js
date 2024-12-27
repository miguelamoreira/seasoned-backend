const dbConfig = {
    HOST: process.env.DB_HOST ,
    USER: process.env.DB_USER ,
    PASSWORD: process.env.DB_PASSWORD ,
    DB: process.env.DB_NAME ,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        connectTimeout: 60000
    }
};

const JWTconfig = { SECRET: process.env.SECRET }

module.exports = {dbConfig, JWTconfig};