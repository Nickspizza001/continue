require("dotenv").config();
const {config} = require('./config')
//get variable from env file
class Settings {
  static getPort() {
    let port = process.env.PORT || config.port
    return port;
  }

  static getHost() {
    let host = process.env.HOST || config.host
    return host;
  }

  static getDB_URI() {
    return process.env.DB_URI || config.db_uri
  }

  static getSecretKey(){
    return process.env.secret_key || config.secret_key
  }
}

module.exports = Settings;
