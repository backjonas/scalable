import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm';

export interface IExercise {
  name: string;
  description: string;
}

@Entity()
export class Exercise {

  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

}

export const createExercise = async (exercise: IExercise) => {
  const repo = getRepository(Exercise);
  const newExercise = new Exercise();
  newExercise.name = exercise.name;
  newExercise.description = exercise.description;
  return await repo.save(newExercise);
};

export const getAllExercises = async () => {
  const repo = getRepository(Exercise);
  return await repo.find();
};

export const getExercise = async (id: string) => {
  const repo = getRepository(Exercise);
  return await repo.findOne(id);
};

export const getExerciseByContent = async (exercise: IExercise) => {
  const repo = getRepository(Exercise);
  return await repo.find({
    where: {
      name: exercise.name,
      description: exercise.description
    }
  });
};

export const deleteExercise = async (id: string) => {
  const repo = getRepository(Exercise);
  return await repo.delete(id);
};

