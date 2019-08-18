'use strict'

const boom = require('boom')
const httpStatus = require('http-status')
const service = require('./userService')
const logger = require('../utils/logger')
const config = require('config')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Bcrypt = require('bcrypt')
const userAccess = require('../utils/userAccess')

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.auth.secret, {
    expiresIn: '300 Minutes'
  })
}

const createSession = async function(req, res) {
  let { username, password } = req.payload
  let { user, isValid } = await service.validateUser(username, password)

  if (!user) {
    return res(boom.unauthorized(`User doesn't exist`))
  }

  if (!isValid) {
    return res(boom.unauthorized(`The password don't match`))
  }

  res({
    id_token: createToken(user),
    user
  }).code(201)
}

const register = async function(req, res) {
  try {
    let { username, password, email, fname, lname, about } = req.payload

    let noExistingUser = await service.checkUser(username, email)

    if (noExistingUser) {
      let newPass = await Bcrypt.hash(password, 10)

      let newUser = {
        username,
        password: newPass,
        email,
        firstName: fname,
        lastName: lname,
        about,
        permissions: userAccess.defaultPermissions
      }
      let { user, ...details } = await service.register(newUser)

      res({
        id_token: createToken(user),
        ...details
      }).code(201)
    } else {
      let errorMessage = `User with same Username/Email already exists`
      logger.error(errorMessage)
      return res(boom.badData(errorMessage, { username, email }))
    }
  } catch (error) {
    let errorMessage = `Error in registering User`
    logger.error(error, errorMessage)
    return res(
      boom.boomify(error, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        details: error
      })
    )
  }
}

const validateSession = async function(req, res) {
  let token = req.payload.token
  jwt.verify(token, config.auth.secret, (err, user) => {
    if (err) {
      return res(boom.unauthorized(`Invalid Token`))
    }
    service
      .findUser(user._id)
      .then(cleanUser => {
        let newToken = createToken(cleanUser)
        return res({
          token: newToken,
          cleanUser
        }).code(201)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

module.exports = {
  createSession,
  validateSession,
  register
}
