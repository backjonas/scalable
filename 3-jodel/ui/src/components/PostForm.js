import { useDispatch } from 'react-redux'
import { createPost } from '../reducers/postReducer'

const PostForm = () => {
  const dispatch = useDispatch()
  const addPost = async (event) => {
    event.preventDefault()
    const content = event.target.post.value
    event.target.post.value = ''
    dispatch(createPost(content))
  }

  return (
    <form onSubmit={addPost}>
      <div><input name="post" /></div>
      <button type="submit">Create post</button>
    </form>
  )
}

export default PostForm