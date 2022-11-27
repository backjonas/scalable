import { configureStore } from '@reduxjs/toolkit'

import gradingResultReducer from './reducers/gradingResultReducer'
import exerciseReducer from './reducers/exerciseReducer'

export const store = configureStore({
  reducer: {
    gradingResult: gradingResultReducer,
    exercises: exerciseReducer
  }
})
