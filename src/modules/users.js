const conn = require('../utils/config')

module.exports = {
  modulCheckEmail: (email) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id, user_id, name, email, password, access, status, created FROM t_users WHERE email='${email}'`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modulTotalPage: (filter, q) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT COUNT (*) AS total, id, user_id, name, email, avatar, access, status, created, updated FROM t_users WHERE ${filter} LIKE '%${q}%'`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelRegister: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO t_users SET?', data, (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      })
    })
  },
  modelLogin: (user_id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id, user_id, name, token, expired, access, status, created, updated FROM t_users WHERE user_id=${user_id}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelUpdate: (data, user_id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE t_users SET? WHERE user_id=${user_id}`,
        data,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelUsers: (filter, q, order_by, sort_by, start_page, limit) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id, user_id, name, email, avatar, access, status, created, updated FROM t_users WHERE ${filter} LIKE '%${q}%' ORDER BY ${order_by} ${sort_by} LIMIT ${start_page}, ${limit}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modulDetailUser: (user_id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id, user_id, name, email, avatar, access, status, created, updated FROM t_users WHERE user_id=${user_id}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelDeleteUser: (user_id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `DELETE FROM t_users WHERE user_id=${user_id}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
}
