import { nanoid } from 'nanoid';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Mainpage from './views/Mainpage';
import PostPage from './views/PostPage';
import postService from './services/posts'
import replyService from './services/replies'


const App = () => {
  const initializeUser = () => {
    let token = window.localStorage.getItem('exerciseUser')
    if (!token) {
      token = nanoid(64);
      window.localStorage.setItem(
        'exerciseUser', token
      )
    }
    postService.setToken(token)
    replyService.setToken(token)
  }
  initializeUser()

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Mainpage />}/>
        <Route path='/post/:id' element={<PostPage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App