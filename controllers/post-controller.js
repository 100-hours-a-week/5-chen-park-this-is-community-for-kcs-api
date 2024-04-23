const HttpStatus = require("http-status-codes");
const {body, param} = require("express-validator");
const PostModel = require("../models/post-model");


module.exports = new class {
    list(req, res) {
        res.json({
            posts: PostModel.all()
        })
    }

    detail = {
        validator: [
            param("id").trim().isNumeric(),
        ],
        controller: (req, res) => {
            const id = req.params.id;
            const post = PostModel.find(id);

            res.json(post)
        }
    }

    write = {
        validator: [
            body('title').trim().notEmpty(),
            body('content').trim().notEmpty(),
            body('image').trim(),
        ],
        controller: (req, res) => {
            const {title, content, image} = req.body;

            const post = PostModel.create(title, content, image);

            post.save()

            res.status(HttpStatus.CREATED);

            res.json({
                "msg": "created"
            });
        }

    }

    update = {
        validator: [
            param("id").trim().isNumeric(),
            body('title').trim().notEmpty(),
            body('content').trim().notEmpty(),
            body('image').trim(),
        ],
        controller: (req, res) => {
            const id = req.params.id
            const {title, content, image} = req.body;

            const post = PostModel.find(id);
            post.update(title, content, image)
            post.save()

            res.json({"msg": "ok"});
        }

    }
}