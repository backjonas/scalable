import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import exerciseReducer from './reducers/exerciseReducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    exercises: exerciseReducer
  }
})
