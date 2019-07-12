const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Defines collection and schema for User
let User = new Schema({
    name: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    providerID: {
      type: Number
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', User);