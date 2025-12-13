const User = require('../models/User');

const getMyProfile = async (req, res) => {
    try {
        res.json(req.user);
    }
    catch (err) {
        res.status(500).json({message: "Server error"});
    }
};

// admin only
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {getMyProfile, getAllUsers};