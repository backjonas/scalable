import { createSlice } from "@reduxjs/toolkit"
import postService from '../services/posts'
import replyService from '../services/replies'


const initialState = {
  allPosts: [],
  currentPost: {},
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      return { ...state, allPosts: action.payload }
    },
    setCurrentPost(state, action) {
      return { ...state, currentPost: action.payload }
    },
    appendPost(state, action) {
      return { 
        ...state,
        allPosts: [action.payload, ...state.allPosts].slice(0, 20)
      }
    },
    appendReply(state, action) {
      state.currentPost.replies.push(action.payload)    }
  }
})

export const { setPosts, setCurrentPost, appendPost, appendReply } = postSlice.actions

export const initializeAllPosts = () => {
  return async dispatch => {
    const posts = await postService.getAll();
    dispatch(setPosts(posts
      .sort((x, y) => new Date(y.timestamp) - new Date(x.timestamp))
      .slice(0, 20))
    )
  }
}

export const initializeOnePost = (postId) => {
  return async dispatch => {
    const post = await postService.getById(postId)
    dispatch(setCurrentPost(post))
  }
}

export const createPost = (content) => {
  return async dispatch => {
    const post = await postService.createNew(content)
    dispatch(appendPost(post))
  }
}

export const createReply = (content, postId) => {
  return async dispatch => {
    const reply = await replyService.createNew(content, postId)
    console.log(reply)
    dispatch(appendReply(reply))
  }
}


export default postSlice.reducer