module.exports = {
  success: (res, message, data, pagination) => {
    const response = {
      code: 200,
      message,
      data,
      pagination,
    }
    res.status(200).json(response)
  },
  create: (res, message, data) => {
    const response = {
      code: 201,
      message,
      data,
    }
    res.status(201).json(response)
  },
  unauthorized: (res, title, message) => {
    const response = {
      code: 401,
      title,
      message,
    }
    res.status(401).json(response)
  },
  notfound: (res, message, data) => {
    const response = {
      code: 404,
      message,
      data,
    }
    res.status(404).json(response)
  },
  largefile: (res, title, message) => {
    const response = {
      code: 413,
      title,
      message,
    }
    res.status(413).json(response)
  },
  authorizationAccess: (res, title, message) => {
    const response = {
      code: 421,
      title,
      message,
    }
    res.status(421).json(response)
  },
  validation: (res, title, message) => {
    const response = {
      code: 422,
      title,
      message,
    }
    res.status(422).json(response)
  },
  lockedAccess: (res, title, message) => {
    const response = {
      code: 423,
      title,
      message,
    }
    res.status(423).json(response)
  },
  error: (res, title, message) => {
    const response = {
      code: 500,
      title,
      message,
    }
    res.status(500).json(response)
  },
}
