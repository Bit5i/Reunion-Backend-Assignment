import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createTweet, deleteTweet, likeTweets, getAllTweets, getUserTweets, getExploreTweets, dislikeTweets, postComment } from "../controllers/tweet.js";

const router = express.Router();

router.post('/', verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.post("/:id/like", likeTweets);
router.post("/:id/dislike", dislikeTweets);
router.get("/timeline/:id", getAllTweets);
router.get("/user/all/:id", getUserTweets);
router.get("/explore", getExploreTweets);
router.post("/comment/:id",postComment);



export default router;