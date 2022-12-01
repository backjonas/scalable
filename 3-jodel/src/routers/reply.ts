import express, { Request, Response } from 'express';
import { getReply, getRepliesForPost, createReply, deleteReply, IReply } from '../entity/Reply';

const replyRouter = express.Router();

replyRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const reply = await getReply(req.params.id);
    if (reply) {
      res.send(reply);
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    console.log(`Error retrieving reply with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

replyRouter.get('/post/:id', async (req: Request, res: Response) => {
  try {
    const replies = await getRepliesForPost(req.params.id);
    res.send(replies);
  }
  catch (error) {
    console.log(`Error retrieving reply with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

replyRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userToken = req.get('authorization');
    if (userToken && userToken.toLowerCase().startsWith('bearer ')) {
      const newReply = { ...req.body, user: userToken.substring(7) } as IReply;
      const reply = await createReply(newReply);
      res.status(201).send({ reply });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(`Error creating reply: ${error}`);
    res.sendStatus(400);
  }
});

replyRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteReply(req.params.id);
    res.sendStatus(204);
  }
  catch (error) {
    console.log(`Error deleting reply with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});


export default replyRouter;