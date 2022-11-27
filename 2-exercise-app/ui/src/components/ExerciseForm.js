import { useDispatch } from 'react-redux'
import submissionService from '../services/submissions'
import { setGradingResult } from '../reducers/gradingResultReducer'

const ExerciseForm = ({ id }) => {
  const createSubmission = (submittedCode, user, exerciseId) => {
    return async dispatch => {
      try {
        await submissionService.createNew(submittedCode, user, exerciseId)
        dispatch(setGradingResult('Your solution has been submitted. The result will be visible on this page. This might take some time.'))
      } catch (error) {
        console.log(`Error creating submission: ${error}`)
      }
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
      <div><textarea name="submission" rows="10" cols="50"/></div>
      <button type="submit">submit</button>
    </form>
  )
}

export default ExerciseForm