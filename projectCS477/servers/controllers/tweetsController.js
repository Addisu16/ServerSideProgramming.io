
const { ObjectId } = require('mongodb');
const Tweet=require('../models/tweets')
const User=require('../models/user')
// posting a tweet
exports.postTweets = async (req, res) => {
    try {
        const { content } = req.body;
        const userID = req.userId;
        const user=await getUser(userID);
        const tweet = ({ content, date:new Date() });
        user.tweets.push(tweet);
        await user.save();
        res.status(201).send('Tweet posted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//  fetching tweets
// exports.getTweets=async (req, res) => {
//     try {
//         const userId = req.userId;
//         const tweets = await User.find({ user: userId }).populate('tweets');
//         console.log(tweets);
//         res.send(tweets);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };




exports.getTweets = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId)
            .populate('followers') // Populate the followers
            .populate('tweets', 'username') // Populate the user information in tweets

        const tweets = user.tweets;
        const followers = user.followers;

        console.log(tweets);
        console.log(followers);

        res.send({ tweets, followers });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


exports.me=async(req,res)=>{
    const userID=await req.userId;
    if(userID){
        const users=await getUser(userID);
        res.status(200).json({username:users.username});
    }

   
}

getUser=async(userID)=>{
    return await User.findById(new ObjectId(userID));
}

