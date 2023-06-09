async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
} module.exports = { logger }

const pool = require("../config");

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        console.log("!auth You are not logged in")
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        console.log("!Barer You are not logged in")
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        console.log("!token You are not logged in")
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT * ' +
        'FROM `user_info` WHERE user_id = ?', [token.user_id]
    )
    console.log("isLoggedIn", authorization, new Date())
    req.user = users[0]

    next()
} module.exports = { logger,   isLoggedIn }