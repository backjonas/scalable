import { useDispatch } from 'react-redux'
import submissionService from '../services/submissions'


const ExerciseForm = ({ id }) => {
  const createSubmission = (submittedCode, user, exerciseId) => {
    return async dispatch => {
      try {
        const createdSubmission = await submissionService.createNew(submittedCode, user, exerciseId)
        console.log(createdSubmission)
      } catch (error) {
        console.log(`Error creating submission: ${error}`)
      }
      // dispatch(setSubmission(newUrl))
      // dispatch(setNotification(newUrl))
    }
  }
  
  const dispatch = useDispatch();
  const submitExercise = async (event) => {
    event.preventDefault();
    const content = event.target.submission.value;
    event.target.submission.value = '';
    dispatch(createSubmission(content, "id123", id))
  }

  return (
    <form onSubmit={submitExercise}>
      <div><input name="submission" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default ExerciseForm