const userService = require('../services/user');

const getUser = async (req, res) => {
    if (!req.user || !req.user.username) {
        return res.status(405).json({ errors: ['congradulations, you broke the code with your token'] });
    }
    const me = req.user.username;
    if (!req.params.username || req.params.username === "") {
        return res.status(400).json({ errors: ['Bad Request of User'] });
    }
    if (me !== req.params.username) {
        return res.status(401).send("Unauthorized");
    }
    const user = await userService.getUserByName(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};
module.exports = { getUser };