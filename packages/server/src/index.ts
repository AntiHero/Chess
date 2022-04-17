import fastify from "fastify";
import fastifyIO from "fastify-socket.io";

import dotenv from "dotenv";

const PATH_TO_ENV = "./.env.test";
dotenv.config({ path: PATH_TO_ENV });

const server = fastify({ logger: true });
const PORT = process.env.PORT || 5000;

server.register(fastifyIO);

server.ready().then(() => {
  server.io.on("connection", (socket) => {
    console.log(socket);
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Server is running at http://localhost:%s", PORT);
});
