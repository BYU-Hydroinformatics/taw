'use strict'

const joi = require('joi')
const config = require('config')

const headerAuthValidation = () => {
  if (config.auth.enableJWTVerify) {
    return joi
      .string()
      .empty('')
      .default('')
      .required()
      .description('Auth token for the current user')
  } else {
    return (
      joi
        .string()
        .empty('')
        .default('')
        // .required()
        .description('Auth token for the current user')
    )
  }
}

const getWeatherByCityName = {
  headers: { auth: headerAuthValidation() },
  query: {
    cityName: joi
      .string()
      .trim()
      .required()
      .description('name of the city whose weather is to be fetched')
  },
  options: {
    allowUnknown: true
  }
}

const addApp = {
  headers: { auth: headerAuthValidation() },
  payload: {
    name: joi
      .string()
      .required()
      .description('Name of the new App being Added to the Database'),
    version: joi
      .string()
      .default('1.0.0')
      .description('App version'),
    description: joi
      .string()
      .empty('')
      .default('')
      .description('App description'),
    githubUrl: joi
      .string()
      .default('http://www.github.com/test.git')
      .description('Url to the Github Repo'),
    imageUrl: joi
      .string()
      .default(
        'http://docs.tethysplatform.org/en/stable/_images/tethys_logo_inverse.png'
      )
      .description('App Image'),
    tags: joi
      .array()
      .items(joi.string())
      .single()
      .default(['Tethys App Warehouse'])
      .description('Tags for the application'),
    metadataJSON: joi
      .object()
      .description('Additional Metadata for the app')
      .default({})
  },
  options: {
    allowUnknown: true
  }
}

module.exports = {
  addApp,
  getWeatherByCityName
}
