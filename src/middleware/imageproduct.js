const multer = require('multer')
const path = require('path')
const maximum_size = 3 // 3 MB

const { largefile, validation, error } = require('../utils/response')

// set disk storage
const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images/products')
  },
  filename: (req, file, callback) => {
    callback(null, `product_${Date.now()}${path.extname(file.originalname)}`)
  },
})

// set connection multer with storage
const multerUploading = multer({
  storage: multerStorage,
  limits: { fileSize: maximum_size * 1024 * 1024 },
  // validation extention file
  fileFilter: (req, file, callback) => {
    const type = path.extname(file.originalname).toLowerCase()
    if (type === '.jpg' || type === '.jpeg' || type === '.png')
      callback(null, true)
    else
      callback(
        { error: 'Extention image must be jpg or png', code: 'wrongtype' },
        false,
      )
  },
})

// set to midleware
module.exports = {
  uploadImageProduct: (req, res, next) => {
    const upload = multerUploading.single('image') // name
    if (upload) {
      upload(req, res, (err) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            largefile(res, 'Check size file', `Maximum file ${maximum_size}Mb`)
          } else if (err.code === 'wrongtype') {
            validation(res, 'Validation extention', err.error)
          } else {
            error(res, 'Something wrong', 'upload image products')
          }
        } else {
          next()
        }
      })
    } else {
      next()
    }
  },
}
