let mongoose = require('mongoose');
const server = 'localhost';
const database = 'gitsprint';

class Database {
    constructor() {
        this._connect()
    }

_connect() {
     mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()