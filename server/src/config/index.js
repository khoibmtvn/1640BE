const dotEnv = require("dotenv")

dotEnv.config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY
}