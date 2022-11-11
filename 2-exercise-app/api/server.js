const express = require('express');
// const bodyParser = require('body-parser');
const amqplib = require('amqplib');

const app = express()

// parse the request body
app.use(express.json())


// rabbitmq to be global variables
let channel, connection

connect()

async function connect() {
  try {
    const amqpServer = 'amqp://localhost:5672'
    connection = await amqplib.connect(amqpServer)
    channel = await connection.createChannel()

    // consume all the orders that are not acknowledged
    await channel.consume('order', (data) => {
      console.log(`Received ${Buffer.from(data.content)}`)
      channel.ack(data);
    })
  } catch (error) {
    console.log(error)
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not found')
})

// port where the service will run
const PORT = 9006

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
