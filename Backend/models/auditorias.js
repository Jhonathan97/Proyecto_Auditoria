const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    }
})

const auditoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    nombre_clientes: [clienteSchema],
    lider_auditor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    miembros_equipo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    informe: {
        type: mongoose.Schema.ObjectId,
        ref: 'Informe'
    }
}, {
    timestamps: true
});

var Auditorias = mongoose.model('Auditoria', auditoriaSchema);

module.exports = Auditorias;