import { useDispatch } from 'react-redux'
import { createUrl } from '../reducers/urlReducer'

const UrlForm = (props) => {
  const dispatch = useDispatch()
  const addUrl = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createUrl(content))
  }

  return (
    <form onSubmit={addUrl}>
      <div><input name="note" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default UrlForm