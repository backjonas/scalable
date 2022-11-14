import 'dotenv/config';
import http from 'http';
import app from './app';
import { createConnection } from 'typeorm';
import amqplib, { Channel, Connection } from 'amqplib'

// // rabbitmq to be global variables
// let channel: Channel, connection: Connection


// const connect = async () => {
//   try {
//     const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
//     const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
//     const RABBITMQ_USER = process.env.RABBITMQ_USER || 'guest';
//     const RABBITMQ_PW = process.env.RABBITMQ_PW || 'guest';

//     const rabbitmqServer = `amqp://${RABBITMQ_USER}:${RABBITMQ_PW}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;
//     connection = await amqplib.connect(rabbitmqServer);
//     channel = await connection.createChannel();
//     // consume all the orders that are not acknowledged
//     await channel.consume('order', (data) => {
//       console.log(`Received ${Buffer.from(data!.content)}`);
//       channel.ack(data!);
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// connect();

const PORT = process.env.API_PORT || 5000;
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
