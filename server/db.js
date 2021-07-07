const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "asd1234",
  host: "localhost",
  database: "todoapp",
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};