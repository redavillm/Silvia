const Post = require("../models/Post");
const Comment = require("../models/Comment");

const list = async (req, res, next) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        const criteria = {};
        if (req.query.userId) {
            criteria.userId = req.query.userId;
        }
        res.json({
            count: await Post.countDocuments(criteria),
            items: await Post.find(criteria).skip(skip).limit(limit),
        });
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json({ item: await Post.findById(req.params.id) });
    }
    catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.json({ item: post });
    }
    catch (error) {
        next(error)
    }
}

const uppdate = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json({ item: post });
    }
    catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return next(new Error('Не удалось найти пост.'));
        }
        await Comment.deleteMany({ postId: post._id });
        await post.deleteOne();
        res.json({ item: post });
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