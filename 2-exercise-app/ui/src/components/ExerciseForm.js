import { useDispatch } from 'react-redux'
import { createSubmission } from '../reducers/submissionReducer'


const ExerciseForm = () => {
  const dispatch = useDispatch();
  const submitExercise = async (event) => {
    event.preventDefault();
    const content = event.target.submission.value;
    event.target.submission.value = '';
    dispatch(createSubmission(content, "id123", 2))
  }

  return (
    <form onSubmit={submitExercise}>
      <div><input name="submission" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default ExerciseForm