import express, { Request, Response } from 'express';
import { getAllUrls, createUrl, getUrl, deleteUrl, updateUrl } from '../entity/Url';

const urlRouter = express.Router();

urlRouter.get('/', async (req: Request, res: Response) => {
  try {
    const urls = await getAllUrls();
    res.send(urls);
  }
  catch (error) {
    console.log(`Error retrieving urls: ${error}`);
    res.sendStatus(400);
  }
});

urlRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const url = await getUrl(req.params.id);
    res.redirect(url.longUrl);
  }
  catch (error) {
    console.log(`Error retrieving url with short url ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

urlRouter.post('/', async (req: Request, res: Response) => {
  try {
    const longUrl = req.body.longUrl;
    const url = await createUrl(longUrl);
    res.status(201).send(url);
  } catch (error) {
    console.log(`Error creating url: ${error}`);
    res.sendStatus(400);
  }
});

urlRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteUrl(req.params.id);
    res.sendStatus(204);
  }
  catch (error) {
    console.log(`Error deleting url with short url ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});

urlRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const newUrl = updateUrl(req.body.longUrl, req.params.id);
    res.status(204).send(newUrl);
  }
  catch (error) {
    console.log(`Error updating url with short url ${req.params.id}: ${error}`);
    res.sendStatus(400);
  }
});


export default urlRouter;