const User = require("../models/User");

const list = async (req, res, next) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        res.json({
            count: await User.countDocuments(),
            items: await User.find().skip(skip).limit(limit).sort({ _id: -1 }),
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        res.json({ item: await User.findById(req.params.id) });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    list,
    getById
}