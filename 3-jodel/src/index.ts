import 'dotenv/config';
import http from 'http';
import app from './app';
import { createConnection } from 'typeorm';

const startServer = async () => {
  const PORT = process.env.API_PORT || 5000;
  try {
    await createConnection();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error starting the server: ${error}`);
  }
};

startServer();