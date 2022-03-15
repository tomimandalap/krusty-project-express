const express = require('express')
const routers = express.Router()

const {
  allHistory,
  addHistory,
  detailHistory,
} = require('../controllers/historys')

const { authentication, admin, cashier } = require('../middleware/auth')

routers
  .get('/all_history', authentication, allHistory)
  .get('/history/:order_id', authentication, admin, detailHistory)
  .post('/add_history', authentication, cashier, addHistory)

module.exports = routers
