import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());
const allUsers = [];
const allTweets = [];

server.post('/sign-up', (request, response) => {
  if (request.body.avatar === '' || request.body.username === '') {
    response.status(400).send('Todos os campos são obrigatórios!');
  } else {
    allUsers.push(request.body);
    response.status(201).send('OK');
  }
});

server.post('/tweets', (request, response) => {
  if (request.body.tweet === '' || request.header.username === '') {
    response.status(400).send('Todos os campos são obrigatórios!');
  } else {
    const tweet = request.body;
    const username = request.header('User');
    const { avatar } = allUsers.find((user) => user.username === username);
    const tweetsWithAvatar = {
      ...tweet,
      username,
      avatar,
    };
    allTweets.push(tweetsWithAvatar);
    console.log(allTweets);
    response.status(201).send('OK');
  }
});

server.get('/tweets', (request, response) => {
  if (allTweets.length < 10) {
    response.send(allTweets);
  } else {
    response.send(allTweets.slice((allTweets.length - 10), allTweets.length));
  }
});

server.get('/tweets/:username', (request, response) => {
  const filteredTweets = allTweets.filter((tweets) => request.params.username === tweets.username);
  response.send(filteredTweets);
});

server.listen(5000);
