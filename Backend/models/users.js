const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongooose = require('passport-local-mongoose');

var User = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongooose);

module.exports = mongoose.model('User', User);


