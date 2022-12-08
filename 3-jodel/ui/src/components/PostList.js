import { useSelector } from 'react-redux'

const PostList = () => {
  const posts = useSelector((state) => state.posts.allPosts)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return(
    <ul>
      <div>
        {posts.map(post =>
          <div key={post.id} style={style}>
            <div>
              <div>{post.content}</div>
              <p/>
              <div>Time posted: {post.timestamp}</div>
              <a href={`/post/${post.id}`}>View post</a>
            </div>
          </div>
        )}
      </div>
    </ul>
  )
}

export default PostList