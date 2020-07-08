const TiposPet = require('../models/TiposPet')

const controller = {}

controller.novo = async (req, res) => {
    try{
        await TiposPet.create(req.body)
        res.status(201).send('');
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try{
        const tiposPet = await TiposPet.find();
        res.send(tiposPet);
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await TiposPet.findById(id)
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
        let tipoPet = req.body

        const id = tipoPet._id
        const obj = await TiposPet.findByIdAndUpdate(id, tipoPet)
        
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
        const obj = await TiposPet.findByIdAndDelete(id)
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