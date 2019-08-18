'use strict'

const boom = require('boom')
const httpStatus = require('http-status')
const logger = require('../utils/logger')

const handleResError = async (res, error, errorMessage) => {
	console.log(error)
	!error.logged && logger.error(err, errorMessage)
	return res(
		boom.boomify(error, {
			statusCode: httpStatus.INTERNAL_SERVER_ERROR,
			message: errorMessage,
			details: error
		})
	)
}

module.exports = { handleResError }
