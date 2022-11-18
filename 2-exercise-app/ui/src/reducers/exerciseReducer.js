import { createSlice } from "@reduxjs/toolkit"
import exerciseService from '../services/exercises'
// import { setNotification } from './notificationReducer'

const initialState = []

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

export const initializeExercises = () => {
  return async dispatch => {
    const exercises = await exerciseService.getAll()
    dispatch(setExercises(exercises))
  }
}

// export const createSubmission = (submittedCode, user, exerciseId) => {
//   return async dispatch => {
//     try {
//       const createdSubmission = await exerciseService.createNew(submittedCode, user, exerciseId)
//       console.log(createdSubmission)
//       console.log('BBBBB')
//     } catch (error) {
//       console.log(`Error creating submission: ${error}`)
//     }
//     // dispatch(setSubmission(newUrl))
//     // dispatch(setNotification(newUrl))
//   }
// }

export default exerciseSlice.reducer