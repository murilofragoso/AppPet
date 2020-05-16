const mongoose = require('mongoose')

const esquemaPet = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: mongoose.ObjectId,
        ref: 'TiposPet',
        required: true
    },
    usuario: {
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: true
    },
})

module.exports = mongoose.model('Pet', esquemaPet, 'pets')