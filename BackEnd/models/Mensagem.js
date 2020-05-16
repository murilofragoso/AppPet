const mongoose = require('mongoose')

const esquemaMensagem = mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    grauFelicidade: {
        type: Number,
        min: 0,
        max: 100,
        require: true
    },
    usuario: {
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: true
    },
})

module.exports = mongoose.model('Mensagem', esquemaMensagem, 'mensagens')