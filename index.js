import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());
const user = {
  username: '',
  avatar: '',
};
const allUsers = [];

server.post('/sign-up', (request, response) => {
  user.username = request.body.username;
  user.avatar = request.body.avatar;
  allUsers.push(user);
  console.log(allUsers);
  response.send('OK');
});

server.listen(5000);
