require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyStatic = require('@fastify/static');
const path = require('path');
const urlRoutes = require('./routes');
const dbConnection = require('./database');


fastify.register(dbConnection);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../build')
});

fastify.register(urlRoutes);

const start = async () => {
  const PORT = process.env.PORT || 5000;
  fastify.listen(PORT, '0.0.0.0', error => {
    if (error) fastify.log.error(error);
    console.log(`Server is now listening on port ${PORT}`);
  });
};

start();
