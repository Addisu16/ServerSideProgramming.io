const tweetRoutes=require('../controllers/tweetsController');

const express=require('express');
const routes=express.Router();



routes.get('/me',tweetRoutes.me);

routes.post('/tweets', tweetRoutes.postTweets)
routes.get('/tweets',tweetRoutes.getTweets);



module.exports=routes;

