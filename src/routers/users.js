const express = require('express')
const routers = express.Router()
const {
  register,
  login,
  logout,
  allDataUser,
  detailUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')
const { authentication, admin } = require('../middleware/auth')
const { uploadImageProfile } = require('../middleware/imageprofile')

routers
  .post('/register', register)
  .post('/login', login)
  .post('/logout/:user_id', logout)
  .get('/users', authentication, admin, allDataUser)
  .get('/user/detail/:user_id', authentication, detailUser)
  .patch(
    '/user/update/:user_id',
    authentication,
    uploadImageProfile,
    updateUser,
  )
  .delete('/user/delete/:user_id', authentication, admin, deleteUser)

module.exports = routers
