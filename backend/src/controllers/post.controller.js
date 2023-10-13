import Post from "../models/Post.js";

export default {
  createPost: async (req, res) => {
    try {
      const { title, body, photo } = req.body;

      if (!title || !body) {
        return res
          .status(400)
          .json({ error: "Please provide a title and body" });
      }

      req.user.password = undefined;
      const post = await Post.create({ title, body, photo, postedBy: req.user });
      await post.save();

      res.status(201).json({
        status: 201,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getAllPosts: async (req, res) => {
    const posts = await Post.find().populate("postedBy", "_id, name").populate("comments.postedBy", "_id name");

    res.status(200).json({
      status: 200,
      message: "Posts fetched successfully",
      data: posts,
    });
    try {
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getmyPosts: async (req, res) => {
    try {
      const posts = await Post.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "_id, name"
      );

      res.status(200).json({
        status: 200,
        message: "Posts by me",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  likePosts: async (req, res) => {
    try {
      const posts = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.user._id } }, { new: true }).exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.status(200).json({ data: result });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  unLikePosts: async (req, res) => {
    try {

      const posts = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.user._id } }, { new: true }).exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.status(200).json({ data: result });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  commentToPost: async (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    const posts = await Post.findByIdAndUpdate(req.body._id, { $push: { comments: comment } }, { new: true })
      .populate("comments.postedBy", '_id name').populate("postedBy", '_id, name')
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.status(200).json({ data: result });
        }
      });
  },
  deleteMyPost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId }).populate("postedBy", '_id');
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.postedBy._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "You cannot delete another post" });
      }
      await post.remove();
      res.status(200).json({ data: post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
