const express = require('express');

const router = express.Router()

router.use("/login", (req, res, next) => {
    res.send(`
        <form action="/chat" method="post">
            <lable>UserName</lable>
            <input type="text" name="UserName">
            <button type="submit">start chat</button>
        </form>
    `)

})

module.exports = router