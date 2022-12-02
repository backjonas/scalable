import express, { Request, Response } from 'express';
import { getAllPosts, getPost, createPost, deletePost, IPost } from '../entity/Post';

const postRouter = express.Router();

postRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  }
  catch (error) {
    console.log(`Error retrieving posts: ${error}`);
    res.sendStatus(400);
  }
});

postRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await getPost(req.params.id);
    if (post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    console.log(`Error retrieving post with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

postRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userToken = req.get('authorization');
    if (userToken && userToken.toLowerCase().startsWith('bearer ')) {
      const newPost = { ...req.body, user: userToken.substring(7) } as IPost;
      const post = await createPost(newPost);
      res.status(201).send(post);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(`Error creating post: ${error}`);
    res.sendStatus(400);
  }
});

postRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deletePost(req.params.id);
    res.sendStatus(204);
  }
  catch (error) {
    console.log(`Error deleting post with id ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});


export default postRouter;