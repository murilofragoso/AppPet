const Usuario = require('../models/Usuario')
const crypto = require('crypto');

const controller = {}

controller.novo = async (req, res) => {
    let usuario = req.body;

    //Validando campos obrigatórios
    if(!usuario.nome || !usuario.email || !usuario.senha || !usuario.confirmarSenha){
        res.status(400).send("Todos os campos são obrigatórios")
        return;
    }
    
    //Validando senhas
    if(usuario.senha != usuario.confirmarSenha){
        res.status(400).send("Senhas não conferem")
        return;
    }
    
    //Validando email
    //Regex para validar e-mail
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailRegex.test(usuario.email)){
        res.status(400).send("E-mail inválido")
        return;
    }

    //criptografando senha
    usuario.senha = criptografarSenha(usuario.senha);

    //Validando se o e-mail ja foi cadastrado
    try{
        const validEmail = await Usuario.find({email: {$regex: usuario.email, $options: 'i'}});
        if(validEmail.length > 0){
            res.status(400).send("E-mail ja cadastrado")
            return;
        }

        await Usuario.create(usuario)
        res.status(201).send('Usuário cadastrado com sucesso!');
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }

}

controller.login = async (req, res) => {
    let usuario = req.body;
    usuario.senha = criptografarSenha(usuario.senha);
    try{
        const result = await Usuario.find({email: {$regex: usuario.email, $options: 'i'}});
        if(result.length > 0){
            let conta = result[0] // find retorna uma lista de usuarios, mas preciso apenas do primeiro, pois o email é unico
            if(conta.senha == usuario.senha){
                res.status(200).send(conta._id);
            }
            else{
                res.status(400).send("E-mail ou senha incorretas")
            }
    
        }else{
            res.status(404).send("E-mail não encontrado");
        }

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

function criptografarSenha(senha){
    const algoritmo = "aes-192-cbc";
    const chave = crypto.scryptSync(senha, 'salt', 24);

    const cipher = crypto.createCipher(algoritmo, chave);
    senha = cipher.update(senha, 'utf8', 'hex');
    senha += cipher.final("hex");
    return senha;
}

module.exports = controller 