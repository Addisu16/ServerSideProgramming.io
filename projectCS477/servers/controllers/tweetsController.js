
const { ObjectId } = require('mongodb');
const Tweet=require('../models/tweets')
const User=require('../models/user')
// posting a tweet
exports.postTweets = async (req, res) => {
    try {
        const { content } = req.body;
        const user = req.userId;
        const tweet = new Tweet({ content, user });
        await tweet.save();
        res.status(201).send('Tweet posted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//  fetching tweets
exports.getTweets=async (req, res) => {
    try {
        const userId = req.userId;
        const tweets = await Tweet.find({ user: userId }).populate('user');
        res.send(tweets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.me=async(req,res)=>{

    const userID=await req.userId;
    if(userID){
        const users=await User.findById(new ObjectId(userID));
        res.status(200).json({username:users.username});
    }

   
}

