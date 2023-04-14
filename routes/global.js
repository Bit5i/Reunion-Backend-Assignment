import  express  from "express";
import {  signin, signup } from "../controllers/auth.js";
import { getUser, update, deleteUser, follow, unFollow, getUserDetails } from "../controllers/user.js";
import { createTweet, deleteTweet, likeTweets, getAllTweets, getUserTweets, getExploreTweets, dislikeTweets, postComment, getPostById } from "../controllers/tweet.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router()

// Auth routes
router.post("/signup", signup);
router.post("/authenticate", signin);

// User routes
router.put('/:id', verifyToken, update);
router.get("/user", verifyToken, getUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/follow/:id", verifyToken, follow);
router.post("/unfollow/:id", verifyToken, unFollow);

// Tweet routes
router.post('/posts', verifyToken, createTweet);
router.delete("/posts/:id", verifyToken, deleteTweet);
router.post("/like/:id", likeTweets);
router.post("/unlike/:id", dislikeTweets);
router.get("/posts/:id", getPostById);
router.get("/all_posts", verifyToken, getUserTweets);
router.post("/comment/:id", verifyToken, postComment);

export default router;