const {
  success,
  create,
  notfound,
  validation,
  error,
} = require('../utils/response')
const {
  modelCreate,
  modelUpdate,
  modelTotalPage,
  modelProducts,
  modelDetail,
  modulDelete,
} = require('../modules/products')
const fs = require('fs')

module.exports = {
  createProduct: (req, res) => {
    const body = req.body
    const file = req.file

    // check data
    if (
      !body.name ||
      !body.category ||
      !body.price ||
      !body.description ||
      !file
    ) {
      validation(
        res,
        'Error input data',
        `${
          !body.name
            ? 'Name'
            : '' || !body.category
            ? 'Category'
            : '' || !body.price
            ? 'Price'
            : '' || !body.description
            ? 'Description'
            : '' || !file
            ? 'Field image is'
            : ''
        } required!`,
      )
    } else {
      const create_data = {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
        image: file.filename,
      }

      modelCreate(create_data)
        .then(() => {
          create(res, 'Create product success', null)
        })
        .catch((err) => {
          error(res, 'Internal Server Error', err.message)
        })
    }
  },
  updateProduct: async (req, res) => {
    const id = req.params.id
    const body = req.body
    const file = req.file

    // check data
    if (
      !body.name ||
      !body.category ||
      !body.price ||
      !body.description
      // ||
      // !file
    ) {
      validation(
        res,
        'Error input data',
        `${
          !body.name
            ? 'Name'
            : '' || !body.category
            ? 'Category'
            : '' || !body.price
            ? 'Price'
            : '' || !body.description
            ? 'Description'
            : ''
          // || !file
          // ? 'Field image is'
          // : ''
        } required!`,
      )
    } else {
      const detail = await modelDetail(id)
      // check length data by id
      if (!detail.length) {
        const path = `./public/images/products/${file.filename}`
        fs.unlinkSync(path) // delete file image
        notfound(res, 'Product ID not found!', null)
      } else {
        const update_data = {
          name: body.name,
          category: body.category,
          price: body.price,
          description: body.description,
          // image: file.filename,
        }

        if (file && file.filename) {
          Object.assign(update_data, { image: file.filename })
          const path = `./public/images/products/${detail[0].image}`
          if (fs.existsSync(path)) {
            fs.unlinkSync(path) // delete old file
          }
        }

        modelUpdate(update_data, id)
          .then(() => {
            create(res, 'Update success', null)
          })
          .catch((err) => {
            error(res, 'Internal Server Error', err.message)
          })
      }
    }
  },
  allProduct: async (req, res) => {
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
      const total_page = await modelTotalPage(filter, q)

      modelProducts(filter, q, order_by, sort_by, start_page, limit)
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
  detailProduct: (req, res) => {
    const id = req.params.id
    modelDetail(id)
      .then((response) => {
        if (!response.length) notfound(res, 'Product ID not found!', null)
        else success(res, 'Detail product success', response, [])
      })
      .catch((err) => {
        error(res, 'Internal Server Error', err.message)
      })
  },
  deleteProduct: async (req, res) => {
    const id = req.params.id
    const detail = await modelDetail(id)
    // check length data by id
    if (!detail.length) {
      notfound(res, 'Product ID not found!', null)
    } else {
      const image = detail[0].image
      const path = `./public/images/products/${image}`

      if (fs.existsSync(path)) {
        fs.unlinkSync(path) // delete file
      }

      modulDelete(id)
        .then(() => {
          create(res, 'Delete user success', null)
        })
        .catch((err) => {
          error(res, 'Internal Server Error!', err.message)
        })
    }
  },
}
