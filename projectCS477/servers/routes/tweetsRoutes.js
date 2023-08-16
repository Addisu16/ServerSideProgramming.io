const tweetRoutes=require('../controllers/tweetsController');

const express=require('express');
const routes=express.Router();



routes.get('/me',tweetRoutes.me);

routes.post('/tweets', tweetRoutes.postTweets)
routes.get('/tweets',tweetRoutes.getTweets);
routes.post('/follow/:userId', tweetRoutes.followUser);
routes.get('/follower',tweetRoutes.getFollowers)
routes.post('/unfollow', tweetRoutes.unfollow)



module.exports=routes;

