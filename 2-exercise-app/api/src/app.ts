import express from 'express';
import exerciseRouter from './routers/exercise';
import submissionRouter from './routers/submission';

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use('/api/exercise', exerciseRouter);
app.use('/api/submission', submissionRouter);
app.use((request, response) => {
  response.sendStatus(404);
});

export default app;