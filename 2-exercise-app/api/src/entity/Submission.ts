import { Entity, PrimaryGeneratedColumn, Column, getRepository, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise, getExercise } from './Exercise';

export interface ISubmission {
  user: string;
  exerciseId: string;
  completed: boolean;
}

@Entity()
export class Submission {

  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    user: string;

  @Column()
    exerciseId: string;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exerciseId' })
    exercise: Exercise;

  @Column()
    completed: boolean;

}

export const createSubmission = async (submission: ISubmission) => {
  const repo = getRepository(Submission);
  const newSubmission = new Submission();
  newSubmission.user = submission.user;
  newSubmission.exercise = await getExercise(submission.exerciseId);
  if (!newSubmission.exercise) {
    console.log(`Exercise with id ${submission.exerciseId} does not exist`)
    return;
  }
  newSubmission.completed = submission.completed;
  return await repo.save(newSubmission);
};

export const getAllSubmissions = async () => {
  const repo = getRepository(Submission);
  return await repo.find();
};

export const getSubmissionsByUser = async (userId: string) => {
  const repo = getRepository(Submission);
  return await repo.find({ where: { user: userId } });
};

export const getSubmissionsByUserAndExercise = async (userId: string, exerciseId: string) => {
  const repo = getRepository(Submission);
  return await repo.find({
    where: {
      user: userId,
      exerciseId: exerciseId
    }
  });
};

export const getSubmission = async (id: string) => {
  const repo = getRepository(Submission);
  return await repo.findOne(id);
};

export const deleteSubmission = async (id: string) => {
  const repo = getRepository(Submission);
  return await repo.delete(id);
};

// export const updateSubmission = async (id: string, submission: ISubmission) => {
//   const repo = getRepository(Submission);
//   const oldSubmission = await repo.findOne(id);
//   return await repo.save({ ...oldSubmission, submission });
// };