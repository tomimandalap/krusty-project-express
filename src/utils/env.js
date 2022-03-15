require('dotenv').config()

module.exports = {
  envPORT: process.env.PORT,
  envDBHOST: process.env.DBHOST,
  envUSER: process.env.USER,
  envPASS: process.env.PASS,
  envNAME: process.env.NAME,
  envSECRETJWT: process.env.SECRETJWT,
}
