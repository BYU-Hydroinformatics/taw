'use strict'

const config = require('config')

const handler = require('./appHandler')
const validations = require('./appValidations')

const API_PATH = '/' + config.get('app.name') + '/api/1.0/app'

const routes = [
	{
		path: API_PATH + '/add',
		method: 'PUT',
		handler: handler.addApp,
		config: {
			description: 'Add an App to the Database',
			tags: ['taw', 'api', 'application management', 'add'],
			validate: validations.addApp,
			notes:
				'Allows for tags as an array and a metdata object that could be any variation of key:value pairs in a JSON format'
		}
	},
	{
		path: API_PATH + '/delete',
		method: 'DELETE',
		handler: handler.getAllApps,
		config: {
			description: 'Delete an App from the Database',
			tags: ['taw', 'api', 'application management', 'delete'],
			validate: validations.getWeatherByCityName
		}
	},
	{
		path: API_PATH + '/edit',
		method: 'POST',
		handler: handler.getAllApps,
		config: {
			description: 'Edit an App existing in the Database',

			tags: ['taw', 'api', 'application management', 'edit'],
			validate: validations.getWeatherByCityName
		}
	},
	{
		path: API_PATH + '/list',
		method: 'GET',
		handler: handler.getAllApps,
		config: {
			description: 'Get a list of all the apps in the database',
			notes:
				'You may provide optional query params to filter the list of apps',
			tags: ['taw', 'api', 'application management', 'get'],
			validate: {}
		}
	}
]

module.exports = routes
