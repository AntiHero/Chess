import server from './app';

export default async function startSever(port?: number): Promise<void> {
  const PORT = port || process.env.PORT;

  if (PORT) {
    await server
      .listen(PORT)
      .then(() => console.log('Server is running at http://localhost:%s', PORT))
      .catch(() => {
        console.error('Server failed to start at port %s', PORT);
      });
  } else {
    console.error('No port has been provided!');
  }
}
