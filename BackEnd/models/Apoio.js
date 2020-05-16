const mongoose = require('mongoose')

const esquemaApoio = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Apoio', esquemaApoio, 'apoios')