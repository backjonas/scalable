import express, { Request, Response } from 'express';
import { getAllSubmissions, getSubmission, createSubmission, deleteSubmission, ISubmission, getSubmissionsByUser, getSubmissionsByUserAndExercise } from '../entity/Submission';
import rabbitMQ from '../rabbitmq/connection';

const submissionRouter = express.Router();

submissionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userToken = req.get('authorization');
    if (userToken && userToken.toLowerCase().startsWith('bearer ')) {
      const submissions = await getSubmissionsByUser(userToken.substring(7));
      res.send(submissions);
    } else {
      res.sendStatus(403);
    }
  }
  catch (error) {
    console.log(`Error retrieving submissions: ${error}`);
    res.sendStatus(400);
  }
});

submissionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const submission = await getSubmission(req.params.id);
    if (submission) {
      res.send(submission);
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    console.log(`Error retrieving submission with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

submissionRouter.get('/exercise/:id', async (req: Request, res: Response) => {
  try {
    const userToken = req.get('authorization');
    if (userToken && userToken.toLowerCase().startsWith('bearer ')) {
      const submissions = await getSubmissionsByUserAndExercise(userToken.substring(7), req.params.id);
      res.send(submissions);
    } else {
      res.sendStatus(403);
    }
  }
  catch (error) {
    console.log(`Error retrieving submissions: ${error}`);
    res.sendStatus(400);
  }
});

submissionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userToken = req.get('authorization');
    if (userToken && userToken.toLowerCase().startsWith('bearer ')) {
      rabbitMQ.send({ ...req.body, user: userToken.substring(7) });
      res.status(200).send('Submission received');
    } else {
      res.sendStatus(403);
    }
    console.log({ ...req.body, user: req.get('authorization') });
  } catch (error) {
    console.log(`Error creating submission: ${error}`);
    res.sendStatus(400);
  }
});

submissionRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteSubmission(req.params.id);
    res.sendStatus(204);
  }
  catch (error) {
    console.log(`Error deleting submission with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

// submissionRouter.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const newUrl = updateUrl(req.body.longUrl, req.params.id);
//     res.status(204).send(newUrl);
//   }
//   catch (error) {
//     console.log(`Error updating url with short url ${req.params.id}: ${error}`);
//     res.sendStatus(400);
//   }
// });


export default submissionRouter;