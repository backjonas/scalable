import amqplib, { Channel, Connection } from 'amqplib';
import { grade } from './grade';

let channel: Channel, connection: Connection;

// connect to rabbitmq
const connect = async () => {
  try {
    const RABBITMQ_USER = process.env.RABBITMQ_USER || 'guest';
    const RABBITMQ_PW = process.env.RABBITMQ_PW || 'guest';
    const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
    const amqpServer = `amqp://${RABBITMQ_USER}:${RABBITMQ_PW}@${RABBITMQ_HOST}:5672`;
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('gradingResponse');
    await channel.assertQueue('gradingRequest');
    channel.prefetch(1);
  } catch (error) {
    console.log(error);
  }
};

const listen = async () => {
  try {
    await channel.consume('gradingRequest', async (data) => {
      const receivedData = JSON.parse(data.content);
      const submittedCode = receivedData.submittedCode;

      const result = await grade(submittedCode);
      const completed = result === 'PASS';
      const newSubmission = {
        user: receivedData.user,
        exerciseId: receivedData.exerciseId,
        completed
      };
      await send(newSubmission);
      channel.ack(data!);

    });
  } catch (error) {
    console.log(error);
  }
};

const send = async (data) => {
  channel.sendToQueue(
    'gradingResponse',
    Buffer.from(
      JSON.stringify({
        ...data,
        date: new Date(),
      }),
    ),
  );
};

const exportedFunctions = { connect, listen };
export default exportedFunctions;