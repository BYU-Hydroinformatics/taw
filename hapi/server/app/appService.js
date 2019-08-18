'use strict'

const axios = require('axios')
const config = require('config')
const logger = require('../utils/logger')
const db = require('../db')

const getWeatherByCityName = async function(cityName) {
  const options = {
    method: 'get',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    params: {
      q: cityName,
      APPID: config.get('openWeather.apiKey')
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    logger.error(error, `Failed to fetch weather for ${cityName}`)
    error.logged = true
    throw error
  }
}

const addApp = async (user, appData) => {
  const newRecord = {
    name: appData.name,
    version: appData.version,
    description: appData.description,
    url: appData.githubUrl,
    image: appData.imageUrl,
    metadata: appData.metadataJSON,
    tags: appData.tags,
    user: user._id
  }

  try {
    const response = await db.addToCollection('apps', newRecord)

    if (response.result.ok == '1') {
      return { status: 'success', recordId: response.insertedIds['0'] }
    } else {
      throw "Error in Database : Couldn't add record"
    }
  } catch (error) {
    logger.error(error, `Failed to add new app record ${newRecord}`)
    error.logged = true
    throw error
  }
}

module.exports = {
  getWeatherByCityName,
  addApp
}
