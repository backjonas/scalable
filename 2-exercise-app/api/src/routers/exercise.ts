import express, { Request, Response } from 'express';
import { getAllExercises, getExercise, createExercise, deleteExercise, IExercise } from '../entity/Exercise';

const exerciseRouter = express.Router();

exerciseRouter.get('/', async (req: Request, res: Response) => {
  try {
    const exercises = await getAllExercises();
    res.send(exercises);
  }
  catch (error) {
    console.log(`Error retrieving exercises: ${error}`);
    res.sendStatus(400);
  }
});

exerciseRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const exercise = await getExercise(req.params.id);
    if (exercise) {
      res.send(exercise);
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    console.log(`Error retrieving exercise with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

exerciseRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newExercise = req.body as IExercise;
    const exercise = await createExercise(newExercise);
    res.status(201).send({ exercise });
  } catch (error) {
    console.log(`Error creating exercise: ${error}`);
    res.sendStatus(400);
  }
});

exerciseRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteExercise(req.params.id);
    res.sendStatus(204);
  }
  catch (error) {
    console.log(`Error deleting exercise with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});


export default exerciseRouter;