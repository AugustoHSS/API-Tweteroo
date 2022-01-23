import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());
const allUsers = [];
const allTweets = [];

server.post('/sign-up', (request, response) => {
  console.log(`teste ${request.body.avatar === ''}`);
  if (request.body.avatar === '' || request.body.username === '') {
    response.status(400).send('Todos os campos são obrigatórios!');
  } else {
    allUsers.push(request.body);
    response.send('OK');
  }
});

server.post('/tweets', (request, response) => {
  const tweet = request.body;
  const { avatar } = allUsers.find((user) => user.username === tweet.username);
  const tweetsWithAvatar = {
    ...tweet,
    avatar,
  };
  allTweets.push(tweetsWithAvatar);
  response.send('OK');
});

server.get('/tweets', (request, response) => {
  if (allTweets.length < 10) {
    response.send(allTweets);
  } else {
    response.send(allTweets.slice((allTweets.length - 10), allTweets.length));
  }
});

server.listen(5000);
