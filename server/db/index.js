const { Pool } = require('pg')

// temporarily removed .env
const pool = new Pool({
  user: "ubuntu",
  password: "asd1234",
  host: "localhost",
  port: 5432,
  database: "todojwt"
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}
