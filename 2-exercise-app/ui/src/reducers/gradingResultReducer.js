import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const gradingResultSlice = createSlice({
  name: 'gradingResult',
  initialState,
  reducers: {
    createResult(state, action) {
      return action.payload
    },
    clearResult(state, action) {
      if (action.payload === state) {
        return ''
      } else {
        return state
      }
    }
  }
})

export const { createResult, clearResult } = gradingResultSlice.actions

export const setGradingResult = (submission) => {
  return async dispatch => {
    dispatch(createResult(submission))
  }
}

export default gradingResultSlice.reducer