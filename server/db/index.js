const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  password: "asd1234",
  host: "localhost",
  port: 5432,
  database: "todojwt"
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
