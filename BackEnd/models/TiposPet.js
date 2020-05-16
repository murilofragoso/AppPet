const mongoose = require('mongoose')

const esquemaTiposPet = mongoose.Schema({
    especie: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('TiposPet', esquemaTiposPet, 'tiposPets')