const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mohitdhakad16';

// This middleware is a function which will take this 3 parameters,the next parameter is the next part of the code from the async function
const fetchUser = (req, res, next) => {
    // Get the jwt token and append id to the object
    const token = req.header('auth-token'); // request token from the header
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) // Synchronously verify the given token
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using valid token' })
    }
}

module.exports = fetchUser;