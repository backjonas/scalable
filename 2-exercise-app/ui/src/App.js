import Mainpage from './views/Mainpage';
import Exercise from './views/Exercise';
import submissionService from './services/submissions'

import { nanoid } from 'nanoid';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  const initializeUser = () => {
    let token = window.localStorage.getItem('exerciseUser')
    if (!token) {
      token = nanoid(64);
      window.localStorage.setItem(
        'exerciseUser', JSON.stringify(token)
      )
    }
    submissionService.setToken(token)
  }
  initializeUser()

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Mainpage />}/>
        <Route path='/exercise/:id' element={<Exercise />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App