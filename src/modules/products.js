const conn = require('../utils/config')

module.exports = {
  modelCreate: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO t_products SET?', data, (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      })
    })
  },
  modelUpdate: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE t_products SET? WHERE id=${id}`,
        data,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelTotalPage: (filter, q) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT COUNT (*) AS total FROM t_products WHERE ${filter} LIKE '%${q}%'`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelProducts: (filter, q, order_by, sort_by, start_page, limit) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM t_products WHERE ${filter} LIKE '%${q}%' ORDER BY ${order_by} ${sort_by} LIMIT ${start_page}, ${limit}`,
        (err, result) => {
          if (!err) resolve(result)
          else reject(new Error(err))
        },
      )
    })
  },
  modelDetail: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM t_products WHERE id=${id}`, (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      })
    })
  },
  modulDelete: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM t_products WHERE id=${id}`, (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      })
    })
  },
}
