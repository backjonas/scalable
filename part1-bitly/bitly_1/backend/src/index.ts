import 'dotenv/config';
import http from 'http';
import app from './app';
import { createConnection } from 'typeorm';

const PORT = process.env.PORT || 5000;
createConnection()
  .then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  })
  .catch((error => {
    console.log(`Error starting the server: ${error}`);
  }));
