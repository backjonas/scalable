import { configureStore } from '@reduxjs/toolkit'

import urlReducer from './reducers/urlReducer'
import notificationReducer from './reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    urls: urlReducer,
    notification: notificationReducer,
  }
})
