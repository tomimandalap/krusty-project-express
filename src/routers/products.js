const express = require('express')
const routers = express.Router()
const {
  createProduct,
  updateProduct,
  allProduct,
  detailProduct,
  deleteProduct,
} = require('../controllers/products')
const { authentication, admin } = require('../middleware/auth')
const { uploadImageProduct } = require('../middleware/imageproduct')

routers
  .post(
    '/product/create',
    authentication,
    admin,
    uploadImageProduct,
    createProduct,
  )
  .patch(
    '/product/update/:id',
    authentication,
    admin,
    uploadImageProduct,
    updateProduct,
  )
  .get('/products', authentication, allProduct)
  .get('/product/detail/:id', authentication, admin, detailProduct)
  .delete('/product/delete/:id', authentication, admin, deleteProduct)

module.exports = routers
