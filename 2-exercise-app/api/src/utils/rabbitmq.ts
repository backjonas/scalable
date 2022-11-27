import amqplib, { Channel, Connection } from 'amqplib';

import { createSubmission } from '../entity/Submission';
import wss from './websocket';

let channel: Channel, connection: Connection;

const connect = async () => {
  try {
    const RABBITMQ_USER = process.env.RABBITMQ_USER || 'guest';
    const RABBITMQ_PW = process.env.RABBITMQ_PW || 'guest';
    const amqpServer = `amqp://${RABBITMQ_USER}:${RABBITMQ_PW}@rabbitmq:5672`;
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('gradingRequest', { durable: true });
    channel.prefetch(1);
  } catch (error) {
    console.log(error);
  }
};

const listen = async () => {
  try {
    await channel.consume('gradingResponse', async (data) => {
      const receivedData = JSON.parse(data.content);
      console.log('Received message');
      console.log(receivedData);
      const result = await createSubmission(receivedData);
      console.log(result);
      channel.ack(data!);
      wss.clients.forEach((client) => {
        console.log('client');
        console.log(client.user);
        client.send(JSON.stringify(result));
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const send = async (data) => {
  channel.sendToQueue(
    'gradingRequest',
    Buffer.from(
      JSON.stringify({
        ...data,
        date: new Date(),
      }),
    ), { persistent: true }
  );
};

const exportedFunctions = { connect, send, listen };
export default exportedFunctions;