import { Entity, PrimaryGeneratedColumn, Column, getRepository, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Post, getPost } from './Post';

export interface IReply {
  content: string;
  user: string;
  postId: string;
}

@Entity()
export class Reply {

  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    content: string;

  @Column()
    user: string;

  @Column()
    postId: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId' })
    post: Post;

  @CreateDateColumn()
    timestamp: Date;

}

export const createReply = async (reply: IReply) => {
  const repo = getRepository(Reply);
  const newReply = new Reply();
  newReply.content = reply.content;
  newReply.user = reply.user;
  newReply.post = await getPost(reply.postId);
  if (!newReply.post) {
    console.log(`Post with id ${reply.postId} does not exist`)
    return;
  }
  return await repo.save(newReply);
};

export const getReply = async (id: string) => {
  const repo = getRepository(Reply);
  return await repo.findOne(id);
};

export const deleteReply = async (id: string) => {
  const repo = getRepository(Reply);
  return await repo.delete(id);
};

export const getRepliesForPost = async (postId: string) => {
  const repo = getRepository(Reply);
  return await repo.find({ where: { postId: postId } });
};

export const getRepliesByUser = async (userId: string) => {
  const repo = getRepository(Reply);
  return await repo.find({ where: { user: userId } });
};

export const getRepliesForUserAndPost = async (userId: string, postId: string) => {
  const repo = getRepository(Reply);
  return await repo.find({
    where: {
      user: userId,
      postId: postId
    }
  });
};

// export const updateSubmission = async (id: string, submission: ISubmission) => {
//   const repo = getRepository(Submission);
//   const oldSubmission = await repo.findOne(id);
//   return await repo.save({ ...oldSubmission, submission });
// };