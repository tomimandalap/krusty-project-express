const mysql = require('mysql2')
const { envUSER, envPASS, envNAME, envDBHOST } = require('./env')

const conn = mysql.createConnection({
  host: envDBHOST,
  user: envUSER,
  password: envPASS,
  database: envNAME,
})

module.exports = conn
