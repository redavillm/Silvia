const User = require("../models/User");
const Post = require("../models/Post")

const list = async (req, res, next) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        res.json({
            count: await User.countDocuments(),
            items: await User.find().skip(skip).limit(limit).sort({ _id: -1 }),
        });
    }
    catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        res.json({ item: await User.findById(req.params.id) });
    }
    catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ item: user });
    }
    catch (error) {
        next(error);
    }
}

const uppdate = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.json({ item: user });
    }
    catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new Error('Не удалось найте пользователя'))
        }
        const count = await Post.countDocuments({ userId: user._id })
        if (!count) {
            return next(new Error('Не удалось удалить пользователя. Удалите пожалуйста посты.'))
        }
        await user.delete();
        res.json({ item: user });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    list,
    getById,
    create,
    uppdate,
    remove
}