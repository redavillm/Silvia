const Comment = require("../models/Comment");

const list = async (req, res, next) => {
    try {
        const { skip = 0, limit = 5 } = req.query;
        const criteria = {};
        if (req.query.postId) {
            criteria.postId = req.query.postId;
        }
        res.json({
            count: await Comment.countDocuments(criteria),
            items: await Comment.find(criteria).skip(skip).limit(limit),
        });
    }
    catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        res.json({ item: await Comment.findById(req.params.id) });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.json({ item: comment });
    } catch (error) {
        next(error);
    }
};

const uppdate = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({ item: comment });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return next(new Error('Не удалось найти комментарий'))
        }
        await comment.delete();
        res.json({ item: comment })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    list,
    getById,
    create,
    remove,
    uppdate,
};