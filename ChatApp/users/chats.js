const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

const messages = [];

router.use('/chat', (req, res, next) => {
    var userName = req.body.UserName; // Get the value entered in the form
    res.redirect(`/welcome/${userName}`);
})

router.get('/welcome/:userName', async (req, res) => {
    const userName = req.params.userName.replace(':', '');

    // Display a welcome message with the username and all messages
    res.send(`
        <h2>Welcome, ${userName}!</h2>
        <form action="/welcome/${userName}" method="post">
            <input type="text" name="message">
            <button type="submit">Send</button>
        </form>
        <h4>${messages.join('<br>') || 'No messages yet.'}</h4>
    `);
});

router.post('/welcome/:userName', async (req, res) => {
    const userName = req.params.userName.replace(':', '');
    const message = `${userName} : ${req.body.message}`;

    messages.push(message);

    try {
        await fs.appendFile('message.txt', message + '\n');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error writing to the file');
    }

    res.redirect(`/welcome/${userName}`);
});


module.exports = router