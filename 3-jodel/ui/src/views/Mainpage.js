import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { initializeAllPosts } from '../reducers/postReducer'; 

const Mainpage = () => {
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

export default Mainpage;