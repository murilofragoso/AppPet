const express = require('express');
const AssistantV2 = require('ibm-watson/assistant/v2');
const {IamAuthenticator} = require('ibm-watson/auth')

const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASISSTANT_APIKEY
})

const assistant = new AssistantV2({
    version: "2020-09-24",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL
})

const service = {}

service.getSession = async () => {
    try{
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTAND_ID
        })
        return session['result'].session_id;
    } catch (err) {
        console.log(err);
        return null;
    }
}

service.postMensagem = async(sessionId, mensagem) => {
    payload = {
        assistantId: process.env.WATSON_ASSISTAND_ID,
        sessionId: sessionId,
        input:{
            message_type:"text",
            text:mensagem
        }
    }

    try{
        const message = await assistant.message(payload);
        return message['result'].output.generic[0].text;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports=service