import { useDispatch, useSelector } from 'react-redux'
// Här typ selectExercise?
// import { voteForAnecdote } from '../reducers/anecdoteReducer'

const ExerciseList = () => {
  // const dispatch = useDispatch()
  const exercises = useSelector((state) => state.exercises)
  console.log(exercises)
  // const anecdotes = useSelector((state) => {
  //   const regexp = new RegExp(currentFilter, 'i')
  //   const matchingAnecdotes = state.anecdotes.filter(anecdote =>    
  //     regexp.test(anecdote.content)
  //   )
  //   return matchingAnecdotes.sort((a, b) => a.votes < b.votes)
  // })

  return(
    <ul>
      {exercises.map(exercise =>
        <div key={exercise.id}>
          <div>
          <a href={`/exercise/${exercise.id}`}>title: {exercise.name}</a>
          </div>
          <div>
            {exercise.description}
            {/* <button 
              onClick={() => dispatch(voteForAnecdote(anecdote))}
            >vote</button> */}
          </div>
        </div>
      )}
    </ul>
  )
}

export default ExerciseList