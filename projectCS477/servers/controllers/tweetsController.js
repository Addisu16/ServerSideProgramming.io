
const ObjectId = require('mongodb').ObjectId;
const Tweet = require('../models/tweets')
const User = require('../models/user');
const mongoose=require('mongoose');

// posting a tweet
exports.postTweets = async (req, res) => {
    try {
        console.log('-----------------&&&&');
        console.log(req.body);
        const { content } = req.body;
        const userID = req.userId;
        const user = await getUser(userID);
        const tweet = ({ content, date: new Date() });
        console.log(tweet);
        user.tweets.push(tweet);
        await user.save();
        res.status(201).send('Tweet posted successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getTweets = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate('followers');

        const followers = user.followers.map(follower => follower._id);
        followers.push(userId); // Include the user's ID in the list of followers

        const userTweetContents = {};

        for (const followerId of followers) {
            const followerUser = await User.findById(followerId);
            const followerUsername = followerUser.username;
            
        
            const filteredTweets = followerUser.tweets.map(tweet => tweet.content);

            userTweetContents[followerUsername] = filteredTweets;
        }

        res.send({ userTweetContents });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getFollowers = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate('followers');
        const followers = user.followers.map(follower => follower._id);
        followers.push(userId); // Include the user's ID in the list of followers

        const followersUsernames = [];

        for (const followerId of followers) {
            const followerUser = await User.findById(followerId);
            const followerUsername = followerUser.username;

            followersUsernames.push(followerUsername);
        }
        
        res.send({ followers: followersUsernames });
    } catch (error) {
        res.status(500).send(error.message);
    }
};



exports.me = async (req, res) => {
    const userID = await req.userId;
    if (userID) {
        const users = await getUser(userID);
        res.status(200).json({ username: users.username });
    }


}

getUser = async (userID) => {
    return await User.findById(new ObjectId(userID));
}



exports.followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const loggedInUserId = req.userId;

        const loggedInUser = await getUser(loggedInUserId);
        const userToFollow = await getUser(userId);

        if (!userToFollow) {
            return res.status(404).send('User not found.');
        }

        if (loggedInUser.followers.includes(userId)) {
            console.log(followers)
            return res.status(400).send('You are already following this user.');
        }

        loggedInUser.followers.push(userId);
        await loggedInUser.save();

        res.status(200).send(`You are now following ${userToFollow.username}.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};








exports.unfollow = async (req, res) => {
    try {
        const userId = req.userId;
        const unfollowUserId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        // Use the $pull operator to remove the specific follower from the array
        await user.updateOne({ $pull: { followers: unfollowUserId } });

        
        res.sendStatus(200);
    } catch (error) {
        console.error('Error unfollowing:', error);
        res.status(500).send(error.message);
    }
};

