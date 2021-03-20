const express = require('express');
const router = express.Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const {IamAuthenticator} = require('ibm-watson/auth')

const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASISSTANT_APIKEY
})

const assistant = new AssistantV2({
    version: "2019-02-28",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL
})

// GET /api/watson/session
router.get("/session", async (req, res) => {
    try{
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTAND_ID
        })
        res.json(session['result']);
    } catch (err) {
        res.send("Therewas an error processing your request");
        console.log(err);
    }
})

// POST /api/watson/message
router.post("/message", async (req, res) => {
    payload = {
        assistantId: process.env.WATSON_ASSISTAND_ID,
        sessionId: req.headers.session_id,
        input:{
            message_type:"text",
            text:req.body.input
        }
    }

    try{
        const message = await assistant.message(payload);
        res.json(message['result']);
    } catch (err) {
        res.send("Therewas an error processing your request");
        console.log(err);
    }
})

module.exports=router