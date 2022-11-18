import { useSelector } from 'react-redux'

const ExerciseList = () => {
  const exercises = useSelector((state) => state.exercises)
  return(
    <ul>
      <h2>Completed exercises</h2>
      <div>
        {exercises.completedExercises.map(exercise =>
          <div key={exercise.id}>
            <div>
            <a href={`/exercise/${exercise.id}`}>title: {exercise.name}</a>
            </div>
          </div>
        )}
      </div>
      <h2>Incomplete exercises</h2>
      <div>
           {exercises.incompleteExercises.map(exercise =>
          <div key={exercise.id}>
            <div>
            <a href={`/exercise/${exercise.id}`}>title: {exercise.name}</a>
            </div>
          </div>
        )}
      </div>
    </ul>
  )
}

export default ExerciseList