import { Entity, PrimaryGeneratedColumn, Column, getRepository, CreateDateColumn, OneToMany } from 'typeorm';
import { Reply } from './Reply';


export interface IPost {
  content: string;
  user: string;
}

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    content: string;

  @Column()
    user: string;

  @CreateDateColumn()
    timestamp: Date;

  @OneToMany(() => Reply, (reply) => reply.post)
    replies: Reply[];

}

export const createPost = async (post: IPost) => {
  const repo = getRepository(Post);
  const newPost = new Post();
  newPost.content = post.content;
  newPost.user = post.user;
  return await repo.save(newPost);
};

export const getPost = async (id: string) => {
  const repo = getRepository(Post);
  return await repo.findOne(id, { relations: ['replies'] });
};

export const deletePost = async (id: string) => {
  const repo = getRepository(Post);
  return await repo.delete(id);
};

export const getAllPosts = async () => {
  const repo = getRepository(Post);
  return await repo.find({ relations: ['replies'] });
};

export const getPostsByUser = async (userId: string) => {
  const repo = getRepository(Post);
  return await repo.find({
    relations: ['replies'],
    where: { user: userId }
  });
};
