// This file defines the various user access levels and provides a validation
// Schema for the authentication function

const userLevels = {
	permissions: {
		0: 'read',
		1: 'write',
		2: 'delete',
		3: 'admin'
	}
}

const defaultPermissions = [0, 1, 2]

module.exports = { userLevels, defaultPermissions }
