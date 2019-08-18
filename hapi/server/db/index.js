let client

const config = require('config')
var MongoClient = require('mongodb').MongoClient

const getCollection = async collectionName => {
	if (!client) {
		client = await MongoClient.connect(config.db.url)
	}
	const db = client.db(config.db.name)
	const collection = db.collection(collectionName)
	return collection
}

const addToCollection = async (collectionName, record) => {
	if (!client) {
		client = await MongoClient.connect(config.db.url)
	}

	const db = client.db(config.db.name)
	const collection = db.collection(collectionName)
	const recordInsert = collection.insert(record)

	return recordInsert
}

module.exports = { getCollection, addToCollection }
