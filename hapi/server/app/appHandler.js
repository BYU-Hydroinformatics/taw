'use strict'

const boom = require('boom')
const httpStatus = require('http-status')
const appCtrl = require('./appCtrl')
const logger = require('../utils/logger')
const config = require('config')
const service = require('./appService')
const jwt = require('jsonwebtoken')
const handlers = require('../utils/handlers')

var MongoClient = require('mongodb').MongoClient

const getAllApps = async (req, res) => {
  let client
  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(config.db.url)
    const db = client.db(config.db.name)
    const collection = db.collection('apps')

    const apps = await collection.find({}).toArray()

    return res({ apps })
  } catch (error) {
    handleResError(res, err, `Failed to fetch apps for warehouse from database`)
  }

  if (client) {
    client.close()
  }
}

const addApp = async (req, res) => {
  let token = req.headers.auth

  jwt.verify(token, config.auth.secret, (err, user) => {
    if (err && config.auth.enableJWTVerify) {
      return res(boom.unauthorized(`Invalid Token`))
    }
    service
      .addApp(user, req.payload)
      .then(resp => {
        return res(resp).code(201)
      })
      .catch(err => {
        handleResError(res, err, `Failed to insert app into Database`)
      })
  })
}

module.exports = { getAllApps, addApp }
