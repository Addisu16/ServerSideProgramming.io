
const ObjectId = require('mongodb').ObjectId;
const Tweet = require('../models/tweets')
const User = require('../models/user');
const mongoose = require('mongoose');

// posting a tweet
exports.postTweets = async (req, res) => {
    try {
        console.log('-----------------&&&&');
        console.log(req.body);
        const {content} = req.body;
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
          ////  const page = req.query.page ? parseInt(req.query.page) : 1;
        //const perPage = 10;
        const user = await User.findById(userId).populate('followers');

        const followers = user.followers.map(follower => follower._id);
        followers.push(userId); // Include the user's ID in the list of followers

        const userTweetContents = {};
         //const startIndex = (page - 1) * perPage;
        //const endIndex = page * perPage;

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
// exports.getFollowers = async (req, res) => {
//     try {
//         const userId = req.userId;
//         // const user = await User.findById(userId).populate('followers');
//         const user = await User.findById(userId);
//         //const followers=user.followers.map(u=>{return {username:u.username,id:u._id}});
//         const followersId = user.followers.map(follower => follower._id);

//         // followers.push(userId); // Include the user's ID in the list of followers

//         const followers = [];

//         for (const followerId of followersId) {
//             const followerUser = await User.findById(followerId);
//             // const followerUsername = followerUser.username;

//             followers.push({ username: followerUser.username, id: followerUser._id });
//         }

//         res.send({ followers: followers });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };



exports.getFollowers = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch the user along with their followers
        const user = await User.findById(userId).populate('followers');

        const followers = user.followers.map(follower => ({
            username: follower.username,
            id: follower._id
        }));

        res.send({ followers: followers });
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
        console.log(userId);
        const unfollowUserId = req.params.userId;
        console.log(unfollowUserId, '......');
        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Use the $pull operator to remove the specific follower from the array
        console.log(await user.updateOne({ $pull: { followers: unfollowUserId } }));



        res.sendStatus(200);
    } catch (error) {
        console.error('Error unfollowing:', error);
        res.status(500).send(error.message);
    }
};

exports.searchFollower = async (req, res) => {
    try {
        const searchTerm = req.query.username;
        const currentUser = req.userId; // Assuming you have the current user's ID

        // Find the current user and populate their followers
        const user = await User.findById(currentUser).populate('followers');

        // Search among the followers' usernames
        const matchingFollowers = user.followers.filter(follower => {
            return follower.username.includes(searchTerm);
        });

        // Extract matching usernames from followers
        const matchingUsernames = matchingFollowers.map(follower => follower.username);

        res.json(matchingUsernames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.searchAll = async (req, res, next) => {
    try {
        const searchTerm = req.query.username;
        const currentUser = req.userId;
        const user = await User.findById(currentUser).populate('followers');
        // Search among the followers' usernames
        const matchingFollowers = user.followers.filter(follower => {
            return follower.username.includes(searchTerm);
        });
        const matchingUsernames = matchingFollowers.map(follower => ({
            username: follower.username,
            id: user._id,
            isFollowed: true
        }));
        // Find all users whose username matches the search term
        const nonFollowers = await User.find({
            _id: { $nin: user.followers },
            username: { $regex: new RegExp(searchTerm, 'i') }
        });
        const matchingNonFollowers = nonFollowers.map(user => ({
            username: user.username,
            id: user._id,
            isFollowed: false
        }));
        const allMatchingUsers = [...matchingUsernames, ...matchingNonFollowers];
        res.json(allMatchingUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};