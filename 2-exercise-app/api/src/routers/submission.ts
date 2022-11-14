import express, { Request, Response } from 'express';
import { getAllSubmissions, getSubmission, createSubmission, deleteSubmission, ISubmission } from '../entity/Submission';

const submissionRouter = express.Router();

submissionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const submissions = await getAllSubmissions();
    res.send(submissions);
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

submissionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newSubmission = req.body as ISubmission;
    const submission = await createSubmission(newSubmission);
    res.status(201).send({ submission });
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