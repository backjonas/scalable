import Mainpage from './views/Mainpage';
import Exercise from './views/Exercise';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
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