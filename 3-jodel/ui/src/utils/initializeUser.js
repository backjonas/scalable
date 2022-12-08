import { nanoid } from 'nanoid';

import postService from '../services/posts'
import replyService from '../services/replies'

export const initializeUser = () => {
  if (typeof window === 'undefined') return
  let token = localStorage.getItem('jodelUser')
  if (!token) {
    token = nanoid(64);
    window.localStorage.setItem(
      'jodelUser', token
    )
  }
  postService.setToken(token)
  replyService.setToken(token)
}