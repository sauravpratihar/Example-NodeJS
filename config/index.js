require("dotenv").config();

module.exports = {
    database: `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,
    port: process.env.SERVER_PORT,
};
