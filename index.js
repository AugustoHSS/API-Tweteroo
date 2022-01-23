import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());
const user = {
  username: '',
  avatar: '',
};
const tweet = {
  username: '',
  tweet: '',
};
const allUsers = [];
const allTweets = [];

server.post('/sign-up', (request, response) => {
  user.username = request.body.username;
  user.avatar = request.body.avatar;
  allUsers.push(user);
  response.send('OK');
});

server.post('/tweets', (request, response) => {
  tweet.username = request.body.username;
  tweet.tweet = request.body.tweet;
  allTweets.push(tweet);
  console.log(allTweets);
  response.send('OK');
});

server.listen(5000);
