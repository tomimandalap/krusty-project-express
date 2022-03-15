const {
  modelAllhistory,
  modelTotalPage,
  modelAddHistory,
  modelDetailHistory,
} = require('../modules/historys')
const {
  success,
  create,
  validation,
  notfound,
  error,
} = require('../utils/response')
module.exports = {
  addHistory: (req, res) => {
    const body = req.body

    if (
      !body.order_id ||
      !body.cashier_name ||
      !body.customer_name ||
      !body.item_order ||
      !body.ppn_amount ||
      !body.total_amount
    ) {
      validation(
        res,
        'Error Input Data',
        `${
          !body.order_id
            ? 'Order ID'
            : !body.cashier_name
            ? 'Cashier Name'
            : !body.customer_name
            ? 'Customer Name'
            : !body.item_order
            ? 'Item Order'
            : !body.ppn_amount
            ? 'PPN'
            : !body.total_amount
            ? 'Total'
            : ''
        } required!`,
      )
    } else {
      modelAddHistory(body)
        .then(() => {
          create(res, 'Create history success', null)
        })
        .catch((err) => {
          error(res, 'Internal Server Error', err.message)
        })
    }
  },
  allHistory: async (req, res) => {
    // filter
    const filter = req.query.filter ? req.query.filter : 'order_id'
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
    const total_page = await modelTotalPage(filter, q)

    modelAllhistory(filter, q, order_by, sort_by, start_page, limit)
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
        error(res, 'Internal Server Error', err.message)
      })
  },
  detailHistory: (req, res) => {
    const order_id = req.params.order_id

    modelDetailHistory(order_id)
      .then((response) => {
        success(res, 'Success', response, null)
      })
      .catch((err) => {
        error(res, 'Internal Server Error', err.message)
      })
  },
}
