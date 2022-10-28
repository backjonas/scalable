import express, { Request, Response } from 'express';
import { IFeedback, createFeedback, getAllFeedback, getFeedbackById, deleteFeedbackById, updateFeedback } from '../entity/Url';

const urlRouter = express.Router();

urlRouter.get('/', async (req: Request, res: Response) => {
  getAllFeedback()
    .then(feedback => {
      res.send({ feedback });
    })
    .catch(error => {
      console.log(`Error retrieving feedback: ${error}`);
      res.sendStatus(400);
    });
});

urlRouter.get('/:id', async (req: Request, res: Response) => {
  getFeedbackById(req.params.id)
    .then(feedback => {
      res.send({ feedback });
    })
    .catch(error => {
      console.log(`Error retrieving feedback with id ${req.params.id}: ${error}`);
      res.sendStatus(400);
    });
});

urlRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newFeedback = req.body as IFeedback;
    await createFeedback(newFeedback);
    res.sendStatus(201);
  } catch (error) {
    console.log(`Error creating feedback: ${error}`);
    res.sendStatus(400);
  }
});

urlRouter.delete('/:id', async (req: Request, res: Response) => {
  deleteFeedbackById(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.log(`Error deleting feedback with id ${req.params.id}: ${error}`);
      res.sendStatus(400);
    });
});

urlRouter.put('/:id', async (req: Request, res: Response) => {
  const newFeedback = req.body as IFeedback;
  updateFeedback(newFeedback, req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.log(`Error updating feedback with id ${req.params.id}: ${error}`);
      res.sendStatus(400);
    });
});


export default urlRouter;