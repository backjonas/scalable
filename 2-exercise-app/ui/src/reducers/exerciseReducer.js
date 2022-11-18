import { createSlice } from "@reduxjs/toolkit"
import exerciseService from '../services/exercises'
import submissionService from '../services/submissions'
// import { setNotification } from './notificationReducer'

const initialState = {
  completedExercises: [],
  incompleteExercises: [],
  currentExercise: {}
}

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setExercises(state, action) {
      return action.payload
    },
    appendExercise(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setExercises, appendExercise } = exerciseSlice.actions

export const initializeAllExercises = () => {
  return async dispatch => {
    const user = window.localStorage.getItem('exerciseUser')
    const submissions = await submissionService.getAll(user);
    const exercises = await exerciseService.getAll();

    const completedExercises = []
    const incompleteExercises = []
    exercises.forEach(exercise => {
      const acceptedSubmission = submissions.find(submission => {
        return submission.exerciseId === exercise.id && submission.completed
      })
      if (acceptedSubmission) {
        completedExercises.push(exercise)
      } else {
        incompleteExercises.push(exercise)
      }
    })
    dispatch(setExercises({ completedExercises, incompleteExercises }))
  }
}

export const initializeOneExercise = (exerciseId) => {
  return async dispatch => {
    const user = window.localStorage.getItem('exerciseUser')
    const exercise = await exerciseService.getById(exerciseId)
    const submissions = await submissionService.getByExerciseId(exerciseId)
    console.log(user)
    console.log(exercise)
    console.log(submissions)
  }
}

export default exerciseSlice.reducer