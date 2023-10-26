// server.mjs
const express = require('express');
const runConversation  = require('./../mod2.ts');

// ... Rest of your ES6 code ...

const app = express();

app.post('/chat', async (req, res) => {
    const userInput = req.body.userInput;
    const conversationHistory = await runConversation(userInput);
    res.json({ conversation: conversationHistory });
});

// ... Rest of your server setup ...
