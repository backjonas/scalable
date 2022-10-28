import { Entity, PrimaryColumn, Column, getRepository } from 'typeorm';
import { nanoid } from 'nanoid';

export interface IUrl {
  id: number;
  shortUrl: string;
  longUrl: string;
}

@Entity()
export class Url {

  @PrimaryColumn()
    id: string;

  @Column()
    longUrl: string;
}

export const createUrl = async (longUrl: string) => {
  const repo = getRepository(Url);
  const newUrl = new Url();
  newUrl.longUrl = longUrl;
  newUrl.id = nanoid(10);
  return await repo.save(newUrl);
};

export const getAllUrls = async () => {
  const repo = getRepository(Url);
  return await repo.find();
};

export const getUrl = async (shortUrl: string) => {
  const repo = getRepository(Url);
  return await repo.findOne(shortUrl);
};

export const deleteUrl = async (shortUrl: string) => {
  const repo = getRepository(Url);
  return await repo.delete(shortUrl);
};

export const updateUrl = async (longUrl: string, shortUrl: string) => {
  const repo = getRepository(Url);
  const oldUrl = await repo.findOne(shortUrl);
  return await repo.save({ ...oldUrl, longUrl });
};