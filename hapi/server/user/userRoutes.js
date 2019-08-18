'use strict'

const config = require('config')

const userHandler = require('./userHandler')
const userValidations = require('./userValidations')

const API_PATH = `/${config.get('app.name')}/api/1.0/user`

const routes = [
	{
		path: API_PATH + '/session/create',
		method: 'POST',
		handler: userHandler.createSession,
		config: {
			tags: ['taw', 'api', 'user management', 'login'],
			validate: userValidations.login,
			description: `Login a user`,
			notes: `Creates a new JWT session if the user is a valid user and has given valid credentials`
		}
	},
	{
		path: API_PATH + '/session/validate',
		method: 'POST',
		handler: userHandler.validateSession,
		config: {
			tags: ['taw', 'api', 'user management', 'token management'],
			validate: userValidations.validate,
			description: `Validate a JWT token to see if it is still valid`,
			notes: `Primarily will be used when the user needs to be revalidated`
		}
	},
	{
		path: API_PATH + '/register',
		method: 'POST',
		handler: userHandler.register,
		config: {
			tags: ['taw', 'api', 'user management', 'register'],
			validate: userValidations.register,
			description: `Register a new user for the warehouse`
		}
	},
	{
		path: API_PATH + '/edit',
		method: 'POST',
		handler: userHandler.createSession,
		config: {
			tags: ['taw', 'api', 'user management', 'edit user'],
			validate: userValidations.edit,
			description: `Edit an existing user on the warehouse`
		}
	}
]

module.exports = routes
