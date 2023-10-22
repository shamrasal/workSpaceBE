const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoutes = require('./logIn/login');
const chatRoutes = require('./users/chats');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(loginRoutes)
app.use(chatRoutes)

app.get('/', function (req, res, next) {
    res.send(`
        <h3>welcome to chat</h3>
        <form action="/login" method="post">
            <button type ='submit'>Click here to start chat</button>
        </form>
    `)
})

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000)