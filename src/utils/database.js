const mongoose = require('mongoose');
const Settings = require('../helpers/settings');

//connects with the database
const dbConnection = async () => {
    let URI = Settings.getDB_URI();
    return mongoose.connect(URI, { useNewUrlParser: true });
}

exports.dbConnection = dbConnection;