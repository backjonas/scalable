const ReplyList = ({ replies }) => {
  if (!replies) return
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return(
    <ul>
      <h2>Replies</h2>
      <div>
        {replies.map(reply =>
          <div key={reply.id} style={style}>
            <div>{reply.content}</div>
            <div>post time: {reply.timestamp}</div>
          </div>
        )}
      </div>
    </ul>
  )
}

export default ReplyList