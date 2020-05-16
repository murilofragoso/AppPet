const Imagem = require('../models/Imagem')

const controller = {}

controller.novo = async (req, res) => {
    try{
        await Imagem.create(req.body)
        res.sendStatus(201)
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try{
        const imagens = await Imagem.find();
        res.send(imagens);
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Imagem.findById(id)
        if (obj) { 
            res.send(obj)
        }
        else {
            res.status(404).end()
        }
    }
    catch (erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.atualizar = async (req, res) => {
    try{
        let imagem = req.body

        const id = imagem._id
        const obj = await Imagem.findByIdAndUpdate(id, imagem)
        
        if(obj){
            res.status(204).end()
        }
        else{
            res.status(404).end()
        }
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.excluir = async(req, res) =>{
    try{
        const id = req.body._id
        const obj = await Imagem.findByIdAndDelete(id)
        if(obj){
            res.status(204).end()
        }
        else{
            res.status(404).end()
        }
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller 