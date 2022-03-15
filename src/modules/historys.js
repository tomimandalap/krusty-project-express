const conn = require('../utils/config')

module.exports = {
  modelAddHistory: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO t_history SET ?', data, (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      })
    })
  },
  modelTotalPage: (filter, q) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT COUNT (*) AS total FROM t_history WHERE ${filter} LIKE '%${q}%'`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelAllhistory: (filter, q, order_by, sort_by, start_page, limit) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM t_history WHERE ${filter} LIKE '%${q}%' ORDER BY ${order_by} ${sort_by} LIMIT ${start_page}, ${limit}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelDetailHistory: (order_id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM t_history WHERE order_id = '${order_id}'`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
}
