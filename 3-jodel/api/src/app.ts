import express from 'express';
import postRouter from './routers/post';
import replyRouter from './routers/reply';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/post', postRouter);
app.use('/api/reply', replyRouter);
app.use((request, response) => {
  response.sendStatus(404);
});

export default app;