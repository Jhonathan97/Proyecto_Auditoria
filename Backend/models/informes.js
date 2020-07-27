const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: false
    },
    autor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const informeSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    items: [itemSchema]
}, {
    timestamps: true
});

var Informes = mongoose.model('Informe', informeSchema);

module.exports = Informes;