import { io, Socket } from 'socket.io-client';
import { Socket as ServerSocket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import startSever from './startServer';

import server from './app';

const PORT = 5000;
let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
let serverSocket:
  | ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  | undefined;

beforeAll(async () => {
  await startSever(PORT);
});

beforeAll((done) => {
  clientSocket = io(`http://localhost:${PORT}`);
  clientSocket.on('connect', done);
});

beforeAll(() => {
  const serverSocketKey = server.io.sockets.sockets.keys().next().value;
  serverSocket = server.io.sockets.sockets.get(serverSocketKey);
});

afterAll(async () => {
  server.io.close();
  clientSocket.close();
});

test('the client should be able to receive a message from the server', (done) => {
  clientSocket.on('hello', (args) => {
    try {
      expect(args).toBe('client');
      done();
    } catch (e) {
      done(e);
    }
  });

  serverSocket?.emit('hello', 'client');
});

test('the server should be able to receive a message from the client', (done) => {
  serverSocket?.on('msg', (args) => {
    try {
      expect(args).toBe('server');
      done();
    } catch (e) {
      done(e);
    }
  });

  clientSocket.emit('msg', 'server');
});

test('the server should respond to message event with ok status', (done) => {
  clientSocket.emit('message', 'world', (response: Response) => {
    expect(response.status).toBe('ok');
    done();
  });
});
