const jwt = require('jsonwebtoken')
const { envSECRETJWT } = require('../utils/env')
const { unauthorized, lockedAccess } = require('../utils/response')

module.exports = {
  authentication: (req, res, next) => {
    const authorization = req.headers.authorization
    //checing token
    if (!authorization) {
      unauthorized(res, 'Authorization access', 'Token is required!')
    } else {
      let token = authorization.split(' ')[1]
      jwt.verify(token, envSECRETJWT, (err, decode) => {
        if (!err) {
          res.access = decode.access
          next()
        } else {
          if (err.name === 'JsonWebTokenError')
            unauthorized(res, 'Authorization access', 'Token is dosen match!')
          else unauthorized(res, 'Authorization access', 'Token expired!')
        }
      })
    }
  },
  admin: (req, res, next) => {
    const access = res.access
    if (access === 1) {
      next()
    } else {
      lockedAccess(res, 'Locked access', 'Access denied, for Admin!')
    }
  },
  cashier: (req, res, next) => {
    const access = res.access
    if (access === 2) {
      next()
    } else {
      lockedAccess(res, 'Locked access', 'Access denied, for cashier!')
    }
  },
}
