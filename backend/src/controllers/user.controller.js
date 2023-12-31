import Post from "../models/Post.js";
import User from "../models/Users.js";


export default {
	getSingleUser: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id }).select('-password');
			const post = await Post.find({ postedBy: req.params.id }).populate("postedBy", "_id, name");
			if (!post) {
				return res.status(422).json({ error: "Not Found" });
			}
			return res.status(200).json({ user, post });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	followers: async (req, res) => {
		try {
			const userFollower = await User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.user._id } }, { new: true });

			if (!userFollower) {
				return res.status(404).json({ error: "User not found" });
			}
			const userFollowing = await User.findByIdAndUpdate(req.user._id, { $push: { following: req.body.followId } }, { new: true });

			return res.status(200).json({ userFollower, userFollowing });

		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	unfollowers: async (req, res) => {
		try {
			const userunFollower = await User.findByIdAndUpdate(req.body.unFollowId, { $pull: { followers: req.user._id } }, { new: true });

			if (!userunFollower) {
				return res.status(404).json({ error: "User not found" });
			}
			const userunFollowing = await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.unFollowId } }, { new: true });

			return res.status(200).json({ userunFollower, userunFollowing });

		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	getSubscribePosts: async (req, res) => {
		try {
			const post = await Post.find({ postedBy: { $in: req.user.following } }).populate('postedBy', "_id name").populate("comments.postedBy", "_id name");

			return res.status(200).json({ data: post });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	updatePhoto: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.user._id, { $set: { photo: req.body.photo } }, { new: true });
			if (!user) {
				return res.status(404).json({ error: "Picture dont upload" });
			}

			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	updateName: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.user._id, { $set: { name: req.body.name } }, { new: true });

			if (!user) {
				return res.status(404).json({ error: "Photo dont update" });
			}

			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
	searchUser: async (req, res) => {
		try {
			const searchPanel = new RegExp("^" + req.body.query);
			const user = await User.find({ email: { $regex: searchPanel } }).select("_id name email photo");
			if (!user) {
				return res.status(422).json({ error: "Not Found" });
			}
			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: "Internal server error" });
		}
	},
};