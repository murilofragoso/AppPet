const Pet = require('../models/Pet')

const controller = {}

controller.novo = async (req, res) => {
    try{
        await Pet.create(req.body)
        res.sendStatus(201)
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try{
        const pets = await Pet.find().populate('tipo').populate('usuario');
        res.send(pets);
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Pet.findById(id)
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
        let pet = req.body

        const id = pet._id
        const obj = await Pet.findByIdAndUpdate(id, pet)
        
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
        const obj = await Pet.findByIdAndDelete(id)
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