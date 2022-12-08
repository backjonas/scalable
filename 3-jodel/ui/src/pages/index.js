import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { initializeUser } from '../utils/initializeUser'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { initializeAllPosts } from '../reducers/postReducer'; 


const Home = () => {
  initializeUser()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAllPosts())
  }, [dispatch])

  return (
    <>
    <div className='center-page'>
      <h1>Posts</h1>
    </div>
    <PostList />
    <PostForm />
    </>
  )
}

export default Home