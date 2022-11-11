const express = require('express');
// const bodyParser = require('body-parser');
const amqplib = require('amqplib');

const app = express();

let channel, connection;
app.use(express.json());

// const calcSocket = socketIO.of('/calc');

const connect = async () => {
  try {
    // rabbitmq default port is 5672
    const amqpServer = 'amqp://localhost:5672';
    connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();

    // make sure that the order channel is created, if not this statement will create it
    await channel.assertQueue('order');
  } catch (error) {
    console.log(error);
  }
};

connect();

app.post('/orders', (req, res) => {
  const data = req.body;

  // send a message to all the services connected to 'order' queue, add the date to differentiate between them
  channel.sendToQueue(
    'order',
    Buffer.from(
      JSON.stringify({
        ...data,
        date: new Date(),
      }),
    ),
  );

  res.send('Order submitted');
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

const PORT = 9005;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});