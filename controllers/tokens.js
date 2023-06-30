const tokenService = require('../services/tokens');

const login = async (req, res) => {
    if (!req.body.username || req.body.username === "" || !req.body.password || req.body.password === "") {
        return res.status(400).json({ errors: ['All fields must be initialized'] });
    }
    const ans = await tokenService.login(req.body.username, req.body.password);
    if (!ans) {
        return res.status(404).json({ errors: ['username or password incorrect'] });
    }
    return res.send(ans);
};
module.exports = { login };