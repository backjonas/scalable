const fastifyPostgres = require('@fastify/postgres');
const fastifyPlugin = require('fastify-plugin');

const dbConnection = async (fastify, options) => {
  const db_host = process.env.DB_HOST || 'localhost';
  const db_user = process.env.DB_USER || 'bitly';
  const db_password = process.env.DB_PW || 'bitly';
  const db_name = process.env.DB_NAME || 'bitly';

  await fastify.register(fastifyPostgres, {
    connectionString: `postgres://${db_user}:${db_password}@${db_host}/${db_name}`
  });

  const client = await fastify.pg.connect();
  await client.query(
    'CREATE TABLE IF NOT EXISTS "urls" ("id" VARCHAR(10) PRIMARY KEY, "longurl" TEXT);'
  );
};

module.exports = fastifyPlugin(dbConnection);