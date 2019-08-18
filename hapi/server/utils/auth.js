const Bcrypt = require('bcrypt')
const config = require('config')
var MongoClient = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')


const validateUser = async (username, password) => {
  let client
  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(config.db.url)
    const db = client.db(config.db.name)
    const collection = db.collection('users')

    let user = await collection.findOne({ username })

    let isValid = false

    if (user) {
      isValid = await Bcrypt.compare(password, user.password)
    }

    return user
  } catch (error) {
    const errorMessage = `Failed to check DB for user.`
    throw errorMessage
  }
}

const validateToken = async userToken => {


  try {


    let user = jwt.verify(token, config.auth.secret, (err, user)

    let isValid = false

    if (user) {
      isValid = await Bcrypt.compare(password, user.password)
    }

    return user
  } catch (error) {
    const errorMessage = `Failed to check DB for user.`
    throw errorMessage
  }

  jwt.verify(token, config.auth.secret, (err, user) => {
    if (err && config.auth.enableJWTVerify) {
      return res(boom.unauthorized(`Invalid Token`))
    }
}
