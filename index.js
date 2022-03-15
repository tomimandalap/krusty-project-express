const express = require('express')
const cors = require('cors')
const app = express()
const { api_v1 } = require('./src/utils/prefix')
const { envPORT } = require('./src/utils/env')
const routerUsers = require('./src/routers/users')
const routerProducts = require('./src/routers/products')
const routerHistory = require('./src/routers/historys')

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

app.get(api_v1, (req, res) => {
  res.send({
    data: null,
    message: 'Hello World!',
  })
})

// router
app.use(api_v1, routerUsers)
app.use(api_v1, routerProducts)
app.use(api_v1, routerHistory)
// image products
app.use(`${api_v1}/image/product`, express.static('./public/images/products'))
// image users
app.use(`${api_v1}/image/user`, express.static('./public/images/users'))

app.listen(envPORT || 3000, () => {
  console.log(`Server running on http://localhost:${envPORT || 3000}`)
})
