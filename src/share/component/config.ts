export const config = {
    rpc: {},
    mysql: {
        database: process.env.DB_NAME || "",
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        host: process.env.DB_HOST || "",
        dialect: "mysql",
        port: parseInt(process.env.DB_PORT as string),
        logging: console.log,
        pool: {
            max: 20,
            min: 2,
            acquire: 30000,
            idle: 60000
        }
    },
    accessToken: {
        secret: process.env.JWT_SECRET || "hieu123654",
        expires: "7d"
    }
}