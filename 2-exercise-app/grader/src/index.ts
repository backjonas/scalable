import 'dotenv/config';
import http from 'http';
import rabbitMQ from './rabbitmq';
import express from 'express';


const startServer = async () => {
  const app = express();
  app.use((request, response) => {
    response.sendStatus(404);
  });

  const PORT = process.env.GRADER_PORT || 9001;
  try {
    await rabbitMQ.connect();
    await rabbitMQ.listen();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });

  } catch (error) {
    console.log(`Error starting the server: ${error}`);
  }
};

startServer();