const Mensagem = require('../models/Mensagem')
const WatsonService = require('../services/api/watson')

const controller = {}

controller.novo = async (req, res) => {
    try{
        
        if (!req.body.texto) {
            res.status(400).send("Mensagem não encontrada")
            return;
        }

        if (req.body.salvarMensagem) {
            const mssg = {
                "usuario": req.body.usuario,
                "grauFelicidade": req.body.grauFelicidade,
                "texto": req.body.texto
            }
            await Mensagem.create(mssg)
            res.status(201).send({
                "armazenarProxMensagem": false,
                "retornoMensagem": "Que legal! Volte amanha com mais histórias, por favor! Agora vou tirar uma soneca! zzZZZZzzz",
                "conversaFinalizada": true,
                "sentimento": 2
            })
        } else {
            const sessionId = await WatsonService.getSession();
            if(!sessionId) {
                res.status(500).send("Erro ao recuperar id da sessão");
                return;
            }
            
            const resultMensagem = await WatsonService.postMensagem(sessionId, req.body.texto);
            if(!resultMensagem) {
                res.status(500).send("Erro ao processar mensagem");
                return;
            }
            
            const retorno = await avaliarMensagem(resultMensagem, req.body.usuario, req.body.sentimento);
            res.status(201).send(retorno);
        }
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    try{
        const mensagens = await Mensagem.find().populate('usuario');
        res.send(mensagens);
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Mensagem.findById(id)
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
        let mensagem = req.body

        const id = mensagem._id
        const obj = await Mensagem.findByIdAndUpdate(id, mensagem)
        
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
        const obj = await Mensagem.findByIdAndDelete(id)
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

controller.mensagensUsuario = async(req, res) => {
    try {
        const id = req.params.id
        const obj = await Mensagem.find({usuario: id})
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

async function avaliarMensagem(retornoWatson, usuario, sentimentoAnterior) {
    let armazenarProxMensagem = false;
    let retornoMensagem = retornoWatson;
    let conversaFinalizada = true; // true pois se o sentimento for neutro, finaliza a conversa após responder
    let sentimento = 1;
    switch (retornoWatson) {
        case "Que bom! diga para mim, o que aconteceu que te deixou feliz?":
            armazenarProxMensagem = sentimentoAnterior > 0; // se estava triste antes, não pede pra contar o  dia e nao armazena a mensagem
            retornoMensagem = sentimentoAnterior == 0
                ? "Que bom! continue pensando em coisas boas e se divertindo! Agora vou tirar uma soneca! zzZZZZzzz"
                : retornoMensagem
            conversaFinalizada = sentimentoAnterior == 0;
            sentimento = 2;
            break;
        case "Poxa :( mas existem dias bons! se lembra daquela vez em que você disse:":
            retornoMensagem = sentimentoAnterior > 0 // se estava triste, e continuou triste, encaminha para especialistas e encerra conversa
                ? await recuperarMensagemFeliz(usuario, retornoWatson)
                : "Que pena! acho que um cachorrinho não pode te ajudar agora :( mas existem pessoas de bom  coração que podem te ajudar!" +
                    " como os psicólogos, tente falar com um deles! ou se estiver pensando em desistir, ligue para 188 e fale com o pessoal do CVV!";
                conversaFinalizada = sentimentoAnterior == 0;
                sentimento = 0;
            break;
    }

    return {
        "armazenarProxMensagem": armazenarProxMensagem,
        "retornoMensagem": retornoMensagem,
        "conversaFinalizada": conversaFinalizada,
        "sentimento": sentimento
    }
}

async function recuperarMensagemFeliz(usuario, retornoWatson){
    var mensagemRetorno = 'Poxa :( mas existem dias bons! Tente se lembrar dos bons momentos! como se sente, depois disso?';
    const mensagens = await Mensagem.find({usuario: usuario, grauFelicidade: 100});
    const valorMaximo = mensagens.length;
    if (valorMaximo > 0) {
        const indexAleatorio = Math.floor(Math.random() * (valorMaximo - 1)) + 1;
        mensagemRetorno = retornoWatson + " '" + mensagens[indexAleatorio].texto + "'? Tente se lembrar dos bons momentos! como se sente, depois disso?"
    }
    return mensagemRetorno
}

module.exports = controller 