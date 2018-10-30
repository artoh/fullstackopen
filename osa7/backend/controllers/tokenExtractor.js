const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    request.user = undefined

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if( token && decodedToken.id) {
        request.user = decodedToken.id
      } 
    } 

    next()
} 

module.exports = tokenExtractor

