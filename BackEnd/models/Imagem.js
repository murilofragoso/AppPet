const mongoose = require('mongoose')

const esquemaImagem = mongoose.Schema({
    caminho: {
        type: String,
        required: true
    },
    sobre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Imagem', esquemaImagem, 'imagens')