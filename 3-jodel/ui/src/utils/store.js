import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../reducers/postReducer'


export const store = configureStore({
  reducer: {
    posts: postReducer
  }
})
