import { createSlice } from "@reduxjs/toolkit"
import submissionService from '../services/submissions'
import { setNotification } from './notificationReducer'

const initialState = []

const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    setSubmissions(state, action) {
      return action.payload
    },
    appendSubmission(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setSubmissions, appendSubmission } = submissionSlice.actions

export const initializeSubmissions = () => {
  return async dispatch => {
    const submissions = await submissionService.getAll()
    dispatch(setSubmissions(submissions))
  }
}

export const createSubmission = (submittedCode, user, exerciseId) => {
  return async dispatch => {
    try {
      const createdSubmission = await submissionService.createNew(submittedCode, user, exerciseId)
      console.log(createdSubmission)
      console.log('BBBBB')
    } catch (error) {
      console.log(`Error creating submission: ${error}`)
    }
    // dispatch(setSubmission(newUrl))
    // dispatch(setNotification(newUrl))
  }
}

export default submissionSlice.reducer