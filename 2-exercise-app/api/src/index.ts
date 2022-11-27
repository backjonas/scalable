import 'dotenv/config';
import http from 'http';
import app from './app';
import { createConnection } from 'typeorm';
import rabbitMQ from './utils/rabbitmq';
import { createExercises } from './utils/initializeExercises';
import { setupWebSocket } from './utils/websocket';

const startServer = async () => {
  const PORT = process.env.API_PORT || 5000;
  try {
    await createConnection();
    await createExercises();
    await rabbitMQ.connect();
    await rabbitMQ.listen();
    const server = http.createServer(app);
    setupWebSocket(server);
    server.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error starting the server: ${error}`);
  }
};

startServer();