import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      title:{
        type: String,
        required: true,
        max: 255,
      },
      description: {
        type: String,
        required: true,
        max: 280,
      },
      likes:{
        type: Array,
        defaultValue: [],
      },
      dislikes: {
        type: Array,
        defaultValue: [],
      },
      comments: {
        type: Array,
        defaultValue: [],
      },
    },
    { timestamps: true }
  );

  export default mongoose.model("Tweet", TweetSchema);