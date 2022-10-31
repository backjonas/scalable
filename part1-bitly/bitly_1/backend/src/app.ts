import express from 'express';
import urlRouter from './routers/url';

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use('/', urlRouter);
app.use((request, response) => {
  response.sendStatus(404);
});

export default app;