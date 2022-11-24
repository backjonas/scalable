import express from 'express';
import exerciseRouter from './routers/exercise';
import submissionRouter from './routers/submission';
import path from 'path';

const app = express();
app.use(express.json());
app.use('/api/submission', submissionRouter);
app.use('/api/exercise', exerciseRouter);
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