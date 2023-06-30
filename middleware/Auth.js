const jwt = require('jsonwebtoken')

// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
            // Verify the token is valid
            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
            // Token validation was successful. Continue to the actual function (index)
            return next()
        } catch (err) {
            console.log('err: ', err);
            return res.status(401).send("Unauthorized");
        }
    }
    else
        return res.status(403).send('Token required');
}
module.exports = isLoggedIn;