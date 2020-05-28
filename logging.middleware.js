
const logRequest = (req, res, next) => {
  console.log(`Incoming request: ${req.method} => body: ${req.body}`)
  return next()
}

module.exports = logRequest
