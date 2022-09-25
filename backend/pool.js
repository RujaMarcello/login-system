const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "login_data_base",
  password: "7536517754472414",
  port: 5432,
});

module.exports = pool;
