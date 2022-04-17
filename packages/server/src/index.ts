import http from 'node:http'
import { Server } from 'socket.io'
import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'

const server = fastify({ logger: true })
const PORT = process.env.PORT || 9000;
server.register(fastifyIO)

server.ready().then(() => {
  server.io.on('connection', socket => {})
})

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }  
  
  console.log('Server is running at http://localhost:%s', PORT);
})
