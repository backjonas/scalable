import { Entity, PrimaryColumn, Column, getRepository } from 'typeorm';

export interface IUrl {
  id: number;
  shortUrl: string;
  longUrl: string;
}

@Entity()
export class Url {

  @PrimaryColumn()
  shortUrl: string;

  @Column()
  longUrl: string;
}

export const createUrl = async (url: IUrl) => {
  const repo = getRepository(Url);
  const newUrl = new Url();
  newUrl.shortUrl = url.shortUrl;
  newUrl.longUrl = url.longUrl;

  return await repo.save(newUrl);
};

// export const getAllFeedback = async () => {
//   const repo = getRepository(Feedback);
//   return await repo.find();
// };

export const getUrl = async (shortUrl: string) => {
  const repo = getRepository(Url);
  return await repo.findOneBy({ shortUrl: shortUrl});
};

export const deleteUrl = async (shortUrl: string) => {
  const repo = getRepository(Url);
  return await repo.delete({ shortUrl: shortUrl});
};

export const updateUrl = async (newUrl: IUrl) => {
  const repo = getRepository(Url);
  const oldUrl = await repo.findOne({ shortUrl: newUrl.shortUrl });
  repo.merge(oldUrl, newUrl);
  return await repo.save(oldUrl);
};