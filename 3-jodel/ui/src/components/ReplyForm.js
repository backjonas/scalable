import { useDispatch } from 'react-redux'
import { createReply } from '../reducers/postReducer'

const ReplyForm = ({ postId }) => {
  const dispatch = useDispatch()
  const addReply = async (event) => {
    event.preventDefault()
    const content = event.target.reply.value
    event.target.reply.value = ''
    dispatch(createReply(content, postId))
  }

  return (
    <form onSubmit={addReply}>
      <div><input name="reply" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default ReplyForm