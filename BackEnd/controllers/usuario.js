const Usuario = require('../models/Usuario')

const controller = {}

controller.novo = async (req, res) => {
    try{
        await Usuario.create(req.body)
        res.status(201).send('');
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Usuario.findById(id)
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
        let usuario = req.body

        const id = usuario._id
        const obj = await Usuario.findByIdAndUpdate(id, usuario)
        
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
        const obj = await Usuario.findByIdAndDelete(id)
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