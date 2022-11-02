import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      Created new short URL:
      <p/>
      <a href={notification.shortUrl}>{notification.shortUrl}</a>
      <p/>
      Original URL:
      <p/>
      <a href={notification.longUrl}>{notification.longUrl}</a> 
    </div>  
  )
}

export default Notification