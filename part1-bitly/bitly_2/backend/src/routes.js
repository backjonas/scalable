const { nanoid } = require('nanoid');

const urlRoutes = async (fastify, options) => {
  fastify.get('/', async (req, res) => {
    await res.sendFile('index.html');
  });

  fastify.get('/random', async (req, res) => {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query(
        `SELECT id, longurl FROM urls 
         ORDER BY RANDOM()
         LIMIT 1`
      );
      if (rows.length > 0) {
        res.redirect(rows[0].longurl);
      } else {
        res.code(404);
      }
    } catch (error) {
      console.log(error);
      res.code(400).send(`Error fetching random url: ${error.message}`);
    } finally {
      client.release();
    }
  });

  fastify.get('/:id', async (req, res) => {
    const client = await fastify.pg.connect();
    try {
      const id = req.params.id;
      const { rows } = await client.query(
        `SELECT id, longurl FROM urls 
         WHERE id='${id}'`
      );
      if (rows.length > 0) {
        res.redirect(rows[0].longurl);
      } else {
        res.code(404);
      }
    } catch (error) {
      console.log(error);
      res.code(400).send(`Error fetching url: ${error.message}`);
    }finally {
      client.release();
    }
  });

  fastify.post('/', async (req, res) => {
    const client = await fastify.pg.connect();
    try {
      let longUrl = req.body.longUrl;
      if (!longUrl.includes('http://') && !longUrl.includes('https://')) {
        longUrl = `http://${longUrl}`;
      }

      const id = nanoid(10);
      await client.query(
        `INSERT INTO urls (id, longurl) 
         VALUES ('${id}', '${longUrl}')`
      );

      const shortUrl = `${req.protocol}://${req.hostname}/${id}`;
      res.code(201).send({ shortUrl, longUrl });
    } catch (error) {
      console.log(error);
      res.code(400).send(`Error creating url: ${error.message}`);
    } finally {
      client.release();
    }
  });

};

module.exports = urlRoutes;