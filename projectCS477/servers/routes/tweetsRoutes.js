const tweetRoutes=require('../controllers/tweetsController');

const express=require('express');
const routes=express.Router();



routes.get('/me',tweetRoutes.me);

routes.post('/tweets', tweetRoutes.postTweets)
routes.get('/tweets',tweetRoutes.getTweets);
routes.post('/follow/:userId', tweetRoutes.followUser);
routes.get('/follower',tweetRoutes.getFollowers)
routes.delete('/unfollow/:_id', tweetRoutes.unfollow)
routes.get('/search', tweetRoutes.searchFollower);



module.exports=routes;

