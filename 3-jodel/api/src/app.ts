import express from 'express';
import postRouter from './routers/post';
import replyRouter from './routers/reply';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/api/post', postRouter);
app.use('/api/reply', replyRouter);
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(
    __dirname, '../build', 'index.html'
  ));
});
app.use((request, response) => {
  response.sendStatus(404);
});

export default app;