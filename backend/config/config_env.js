let config = {
    development: {
        server: {
            host: "127.0.0.1",
            port: 3002
        },
        database: {
            db_name: "vfpneqky",
            host: "drona.db.elephantsql.com",
            username: "vfpneqky",
            password: "0ermV8uOr4yCaDeQP--qedFVVFOkzJAb",
            dialect: "postgresql",
            pool: {
                max: 100,
                min: 1,
                acquire: 20000,
                idle: 20000,
                evictionRunIntervalMillis: 5,
                softIdleTimeoutMillis: 5
            }
        },
        jwt_secret: "secret"
    },
    production: {
        jwt_secret: "secret"
    }
};
module.exports = config;
