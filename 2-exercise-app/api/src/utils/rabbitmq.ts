import amqplib, { Channel, Connection } from 'amqplib';
import { createSubmission } from '../entity/Submission';
let channel: Channel, connection: Connection;

// connect to rabbitmq
const connect = async () => {
  try {
    // rabbitmq default port is 5672
    const amqpServer = 'amqp://localhost:5672';
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