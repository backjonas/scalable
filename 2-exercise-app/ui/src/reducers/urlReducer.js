import { createSlice } from "@reduxjs/toolkit"
import urlService from '../services/urls'
import { setNotification } from './notificationReducer'

const initialState = ""

const urlSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setUrl(state, action) {
      return action.payload
    }
  }
})

export const { setUrl } = urlSlice.actions

export const createUrl = longUrl => {
  return async dispatch => {
    const newUrl = await urlService.createNew(longUrl)
    dispatch(setUrl(newUrl))
    dispatch(setNotification(newUrl))
  }
}

export default urlSlice.reducer