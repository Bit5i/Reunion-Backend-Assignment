import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";


export const getUser = async (req, res, next) => {
    try{
        const currentUserId = req.get("user_id");
        const user = await User.findById(currentUserId);
        const response = {
          name: user.username,
          number_of_followers: user.followers.length,
          number_of_followings: user.following.length
        };
        res.status(200).json(response);
    }catch(err){
        next(err);
    }
};

export const update = async (req, res, next) => {
        if(req.params.id === req.user.id){
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
            
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
             );
                res.status(200).json(updatedUser);
            
    }catch(err){
        next(err);
    }
}else{
        return next (handleError(403,"You can only update your own account"));
    }
};


export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id);
            await Tweet.removeAllListeners({userId: req.params.id});
            res.status(200).json('User Deleted');
        
}catch(err){
    next(err);
}
}else{
    return next (handleError(403,"You can only update your own account"));
}
};

export const follow = async (req, res, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUserId = req.get("user_id");
    const currentUser = await User.findById(currentUserId);

    if (!user.followers.includes(currentUserId)) {
      await user.updateOne({
        $push: { followers: currentUserId },
      });

      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      res.status(403).json("you already follow this user");
    }
    res.status(200).json("following the user");
  } catch (err) {
    next(err);
  }
};
  export const unFollow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUserId = req.get("user_id");
      const currentUser = await User.findById(currentUserId);
  
      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: currentUserId },
        });
  
        await currentUser.updateOne({ $pull: { following: req.params.id } });
      } else {
        res.status(403).json("you are not following this user");
      }
      res.status(200).json("unfollowing the user");
    } catch (err) {
      next(err);
    }
  };

  export const getUserDetails = async (req, res, next) => {
    try{
      const user = await User.findOne({username: req.body.username});

      if(!user) return next(handleError(404, "User not found"));

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if(!isCorrect) return next(handleError(400, "Wrong Password"));

      const token = jwt.sign({ id: user._id}, process.env.JWT);

      const { password, ...othersData  } = user._doc;

      res.cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
      
  }catch(err){
      next(err);

  }
  }