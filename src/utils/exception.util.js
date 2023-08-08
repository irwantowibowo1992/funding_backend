class ErrorHandler {
  handle (err, req, res, next) {
    // console.error(err)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    res.status(statusCode).send({
      code: statusCode,
      message
    })
  }
}

module.exports = ErrorHandler
