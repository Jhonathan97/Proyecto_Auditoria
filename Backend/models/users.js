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
    correo_electronico: {
        type: String,
        required: true,
        unique: true
    },
    googleId: String,
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongooose);

module.exports = mongoose.model('User', User);


