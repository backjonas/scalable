import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeOnePost } from '../../reducers/postReducer'; 
import { initializeUser } from '../../utils/initializeUser'
import ReplyForm from '../../components/ReplyForm';
import ReplyList from '../../components/ReplyList';


const PostPage = (props) => {
  initializeUser();
  const postId = props.params.id;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOnePost(postId))
  }, [dispatch, postId])

  const post = useSelector((state) => state.posts.currentPost)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
    <a href='/'>
      <h4 className="nav-header">
        Back to mainpage
      </h4>
    </a>
    <h2>Post</h2>
    <p/>
    <div style = {style}>
      <div>{post.content}</div>
      <p/>
      <div>Time posted: {post.timestamp}</div>
    </div>
    <p/>
    <ReplyList replies={post.replies}/>
    <ReplyForm postId={post.id}/>
    </>
  )
}

export default PostPage;