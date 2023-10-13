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
	}
};