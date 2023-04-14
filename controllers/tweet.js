import Tweet from "../models/Tweet.js";
import { handleError } from "../error.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const createTweet = async (req, res, next) => {
  try {
    const currentUserId = req.get("user_id");
    const tweetReq = {
      userId: currentUserId,
      ...req.body,
    };
    const newTweet = new Tweet(tweetReq);
    const savedTweet = await newTweet.save();

    const { _id, title, description, createdAt } = savedTweet;
    const response = {
      _id,
      title,
      description,
      createdAt,
    };

    res.status(200).json(response);
  } catch (err) {
    handleError(500, err);
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    const deleteTweetId = await Tweet.findById(req.params.id);

    const currentUserId = req.get("user_id");

    const tweet = await Tweet.findById(deleteTweetId);
    if (tweet.userId === currentUserId) {
      await tweet.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeTweets = async (req, res, next) => {
  try {
    const currentUserId = req.get("user_id");

    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(currentUserId)) {
      await tweet.updateOne({ $push: { likes: currentUserId } });
      res.status(200).json("post has been liked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const dislikeTweets = async (req, res, next) => {
  try {
    const currentUserId = req.get("user_id");
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.likes.includes(currentUserId)) {
      await tweet.updateOne({ $push: { dislikes: currentUserId } });
      res.status(200).json("tweet has been unliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Tweet.findOne({ _id: req.params.id });
    if (!post) return next(handleError(404, "Post not found"));
    const response = {
      id: post._id,
      number_of_likes: post.likes.length,
      number_of_comments: post.comments.length,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const postComment = async (req, res, next) => {
  try {
    //Tweet
    const post = await Tweet.findById(req.params.id);

    // Create a new comment based on the request body
    const comment = new Comment({
      text: req.body.text,
    });

    // Save the comment to the database
    const savedComment = await comment.save();

    if (post.commments = undefined) {
      post.commments = []
    }

    post.comments.push(savedComment._id);

    await post.save();

    // Respond with the newly created comment
    res.status(201).json(savedComment._id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    const currentUserId = req.get("user_id");

    const userTweets = await Tweet.find({ userId: currentUserId }).sort({
      createAt: -1,
    });

    var response = [];
    for(var i = 0; i < userTweets.length; i++) {
      const userTweet = userTweets[i];
      var comments = [];
      if (userTweet.comments != undefined) {
        for(var j = 0; j < userTweet.comments.length; ++j) {
          const currentComment = await Comment.findById(userTweet.comments[j]);
          comments.push(currentComment.text);
        }
      }
      response.push({
        ID: userTweet._id,
        title: userTweet.title,
        description: userTweet.description,
        createAt: userTweet.createdAt,
        comments: comments,
        number_of_likes: userTweet.likes.length,
      })
    }

    res.status(200).json(response);
  } catch (err) {
    handleError(500, err);
  }
};
export const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};
