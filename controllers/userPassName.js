const userPassNameService = require('../services/userPassName');

const registerUser = async (req, res) => {
    if (!req || !req.body || !req.body.password || !req.body.username || !req.body.displayName || !req.body.profilePic) {
        return res.status(402).json({ errors: ['all fields are mandatory'] });
    }

    if (req.body.password.length < 8) {
        return res.status(400).json({ errors: ['Password must contain at least 8 characters'] });

    } else if (!/[0-9]/.test(req.body.password) || !/[a-z]/.test(req.body.password) || !/[A-Z]/.test(req.body.password)) {
        return res.status(400).json({ errors: ['Password must contain a combination of uppercase and lowercase letters and numbers'] });

    } else if (
        !/^[a-zA-Z0-9\._:\-\?!]+$/.test(req.body.username) ||
        !/^[a-zA-Z0-9\._:\-\?! ]+$/.test(req.body.displayName) ||
        !/^[a-zA-Z0-9\._:\-\?!]+$/.test(req.body.password)) {
        return res.status(400).json({ errors: ['You choose invalid characters'] });

    } else if (req.body.profilePic === 'images/user.png') {
        return res.status(400).json({ errors: ['image is a mandatory field'] });

    } else if (req.body.username.length < 2 || req.body.displayName.length < 2) {
        return res.status(400).json({ errors: ['inputs must contain at least 2 characters'] });

    } else if (req.body.username.length > 32 || req.body.displayName.length > 32 || req.body.password.length > 32) {
        return res.status(400).json({ errors: ['inputs must contain until 32 characters'] });

    }

    const user = await userPassNameService.createUserPassName(req.body.username, req.body.password, req.body.displayName, req.body.profilePic);
    if (!user) {
        return res.status(409).json({ errors: ['user already exists'] });
    }
    return res.status(200).json({});

};
module.exports = { registerUser };




