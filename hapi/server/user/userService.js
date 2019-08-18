'use strict'

const axios = require('axios')
const logger = require('../utils/logger')
const Bcrypt = require('bcrypt')
const config = require('config')
const db = require('../db')
var ObjectId = require('mongodb').ObjectID

const validateUser = async (username, password) => {
  try {
    const collection = await db.getCollection('users')

    let user = await collection.findOne({
      username
    })

    let isValid = false

    if (user) {
      isValid = await Bcrypt.compare(password, user.password)
      if (user.password) delete user.password

      if (user._id) {
        user._id = user._id.toHexString()
      }
    }

    return {
      user,
      isValid
    }
  } catch (error) {
    const errorMessage = `Failed to check DB for user.`
    logger.error(error, errorMessage)
    throw error
  }
}

const findUser = async userid => {
  try {
    const collection = await db.getCollection('users')

    let user = await collection.findOne({
      _id: ObjectId.createFromHexString(userid)
    })

    if (user.password) delete user.password

    return {
      user
    }
  } catch (error) {
    const errorMessage = `Failed to check DB for user.`
    logger.error(error, errorMessage)
    throw error
  }
}

const register = async user => {
  try {
    const collection = await db.getCollection('users')

    let records = await collection.insert(user)
    let registrationSuccess = records.result.ok === 1

    return {
      user,
      registrationSuccess
    }
  } catch (error) {
    const errorMessage = `Failed to insert newUser into DB.`
    logger.error(error, errorMessage)
    throw error
  }
}

const checkUser = async (username, email) => {
  try {
    const collection = await db.getCollection('users')

    let user = await collection.findOne({
      $or: [{ username }, { email }]
    })

    return user == null
  } catch (error) {
    const errorMessage = `Failed to check db for user.`
    logger.error(error, errorMessage)
    return true
  }
}

module.exports = {
  validateUser,
  findUser,
  register,
  checkUser
}
