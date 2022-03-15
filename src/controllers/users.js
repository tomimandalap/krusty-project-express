const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { envSECRETJWT } = require('../utils/env')
const {
  success,
  create,
  notfound,
  validation,
  lockedAccess,
  error,
} = require('../utils/response')
const {
  modulCheckEmail,
  modelRegister,
  modelLogin,
  modelUpdate,
  modelUsers,
  modulTotalPage,
  modulDetailUser,
  modelDeleteUser,
} = require('../modules/users')
const fs = require('fs')

module.exports = {
  register: (req, res) => {
    const body = req.body
    // checking parameter name, email & password
    if (!body.name || !body.email || !body.password) {
      validation(
        res,
        'Error input data',
        `${
          !body.name
            ? 'Name'
            : '' || !body.email
            ? 'Email'
            : '' || !body.password
            ? 'Password'
            : ''
        } required!`,
      )
    } else {
      modulCheckEmail(body.email)
        .then(async (response) => {
          const data = await response
          // check email
          if (data.length) {
            validation(res, 'Check email', 'Email has been register')
          } else {
            const user_id = await Date.now()
            const salt = await bcrypt.genSaltSync(10)
            const password = await bcrypt.hashSync(body.password, salt)

            const sendData = {
              user_id,
              name: body.name,
              email: body.email,
              password,
            }
            modelRegister(sendData)
              .then(() => {
                create(res, 'Register success', null)
              })
              .catch((err) => {
                error(res, 'Internal Server Error', err.message)
              })
          }
        })
        .catch((err) => {
          error(res, 'Internal Server Error', err.message)
        })
    }
  },
  login: (req, res) => {
    const body = req.body
    // checking paramerter email & password
    if (!body.email || !body.password) {
      validation(
        res,
        'Error input data',
        `${
          !body.email ? 'Email' : '' || !body.password ? 'Password' : ''
        } required!`,
      )
    } else {
      // check email
      modulCheckEmail(body.email)
        .then(async (response) => {
          const data = await response
          if (!data.length) {
            validation(
              res,
              'Check email',
              'Email is not registered in our system',
            )
          } else {
            const hash = await data[0].password
            const comparePassword = await bcrypt.compareSync(
              body.password,
              hash,
            )
            if (!comparePassword) {
              validation(
                res,
                'Check Password',
                'Wrong password, please check again!',
              )
            } else {
              // checking status account inactive or active
              if (data[0].status === 0) {
                lockedAccess(
                  res,
                  'Check Status',
                  'your account is not activation!',
                )
              } else {
                // create token
                const token = jwt.sign(
                  {
                    user_id: data[0].user_id,
                    name: data[0].name,
                    access: data[0].access,
                  },
                  envSECRETJWT,
                  { expiresIn: '1d' },
                )
                const expired = new Date()
                expired.setDate(expired.getDate() + 1)
                // set send data and id
                const user_id = data[0].user_id
                const sendData = {
                  token,
                  expired: `${expired
                    .toISOString()
                    .substring(
                      0,
                      10,
                    )} ${expired.getHours()}:${expired.getMinutes()}:00`,
                }
                modelUpdate(sendData, user_id).then(() => {
                  modelLogin(user_id)
                    .then((response) => {
                      success(res, 'Login success', response, [])
                    })
                    .catch((err) => {
                      error(res, 'Internal Server Error', err.message)
                    })
                })
              }
            }
          }
        })
        .catch((err) => {
          error(res, 'Internal Server Error', err.message)
        })
    }
  },
  logout: (req, res) => {
    const user_id = req.params.user_id
    const data = {
      token: null,
      expired: null,
    }

    modelUpdate(data, user_id)
      .then((response) => {
        if (response.affectedRows) {
          success(res, 'Logout Success', null, [])
        } else {
          notfound(res, 'User id not found!', null)
        }
      })
      .catch((err) => {
        error(res, 'Internal Server Error!', err.message)
      })
  },
  allDataUser: async (req, res) => {
    try {
      // filterby
      const filter = req.query.filter
        ? req.query.filter.toString().toLowerCase()
        : 'name'
      // keyword
      const q = req.query.q ? req.query.q.toString().toLowerCase() : ''
      // order_by & sort_by
      const order_by = req.query.order_by ? req.query.order_by : 'id'
      const sort_by = req.query.sort_by
        ? req.query.sort_by.toString().toLowerCase()
        : 'desc'
      // pagination
      const page = req.query.page ? req.query.page : 1
      const limit = req.query.limit ? req.query.limit : 25
      const start_page = page === 1 ? 0 : (page - 1) * limit
      const total_page = await modulTotalPage(filter, q)

      modelUsers(filter, q, order_by, sort_by, start_page, limit)
        .then((response) => {
          const pagination = {
            page,
            limit,
            total_data: total_page[0].total,
            total_page: Math.ceil(total_page[0].total / limit),
          }
          success(res, 'Success', response, pagination)
        })
        .catch((err) => {
          error(res, 'Internal Server Error!', err.message)
        })
    } catch (err) {
      error(res, 'Oops, Something wrong!', err)
    }
  },
  detailUser: (req, res) => {
    const user_id = req.params.user_id
    modulDetailUser(user_id)
      .then((response) => {
        success(res, 'GET detail Success', response, [])
      })
      .catch((err) => {
        error(res, 'Internal Server Error!', err.message)
      })
  },
  updateUser: async (req, res) => {
    const user_id = req.params.user_id
    const body = req.body
    const file = req.file

    if (file) {
      const detail = await modulDetailUser(user_id)
      // check user id
      if (!detail.length) {
        const path = `./public/images/users/${file.filename}`
        fs.unlinkSync(path) // delete file image
        notfound(res, 'User ID not found!', null)
      } else {
        const { avatar } = detail[0]

        const update_file = {
          name: body.name,
          avatar: file.filename,
        }

        // check image user name is avatar.png
        if (avatar === 'avatar.png') {
          modelUpdate(update_file, user_id)
            .then((response) => {
              if (response.affectedRows) create(res, 'Update Success', null)
            })
            .catch((err) => {
              error(res, 'Internal Server Error!', err.message)
            })
        } else {
          const path = `./public/images/users/${avatar}`
          if (fs.existsSync(path)) fs.unlinkSync(path)
          modelUpdate(update_file, user_id)
            .then((response) => {
              if (response.affectedRows) create(res, 'Update Success', null)
            })
            .catch((err) => {
              error(res, 'Internal Server Error!', err.message)
            })
        }
      }
    } else {
      modelUpdate(body, user_id)
        .then((response) => {
          if (response.affectedRows) {
            create(res, 'Update Success', null)
          } else {
            notfound(res, 'User id not found!', null)
          }
        })
        .catch((err) => {
          error(res, 'Internal Server Error!', err.message)
        })
    }
  },
  deleteUser: (req, res) => {
    const user_id = req.params.user_id
    modelDeleteUser(user_id)
      .then((response) => {
        if (response.affectedRows) {
          create(res, 'Delete user success', null)
        } else {
          notfound(res, 'User id not found!', null)
        }
      })
      .catch((err) => {
        error(res, 'Internal Server Error!', err.message)
      })
  },
}
