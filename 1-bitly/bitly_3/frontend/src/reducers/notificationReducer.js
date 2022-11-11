import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const newUrl = action.payload
      return newUrl
    },
    clearNotification(state, action) {
      if (action.payload === state) {
        return ''
      } else {
        return state
      }
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const setNotification = (newUrl) => {
  return async dispatch => {
    dispatch(createNotification(newUrl))
  }
}

export default notificationSlice.reducer