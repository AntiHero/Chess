import fastify from 'fastify';
import fastifyIO from 'fastify-socket.io';

import dotenv from 'dotenv';

const PATH_TO_ENV = './.env.test';
dotenv.config({ path: PATH_TO_ENV });

const server = fastify({ logger: true });
console.log(process.env.TEST, 'test');

server.register(fastifyIO, {
  cors: {
    origin: process.env.TEST ? '*' : 'http://localhost:8080',
  },
});

server.ready().then(() => {
  server.io.on('connection', (socket) => {
    console.log(socket.id, 'id');
    socket.emit('message', { data: 'text from server' });

    socket.on('message', (msg, cb) => {
      console.log('here');
      console.log(msg);

      cb({
        status: 'ok',
      });
    });
  });
});

export default server;
