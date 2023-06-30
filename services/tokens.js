const UserPassName = require('../models/userPassName');
const userService = require('./user');
const jwt = require("jsonwebtoken")

const login = async (username, password) => {
    try {
        const userObj = await userService.getUserByName(username);
        if (!userObj) {
            return null;
        };
        const user = await UserPassName.findOne({
            user: userObj,
            password: password
        });

        if (user) {
            const data = { username: userObj.username }
            // Generate the token.
            const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' })
            // Return the token to the browser
            return token
        }
        return null
    } catch (err) {
        console.log('err: ', err);

    }


};

module.exports = { login }