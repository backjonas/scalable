import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Navbar from '../components/Navbar';
import ExerciseList from '../components/ExerciseList'
import { initializeExercises } from '../reducers/exerciseReducer'; 

const Mainpage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeExercises())
  }, [dispatch])
  return (
    <>
    <Navbar />
    <div className='center-page'>
      <h1>Headerr</h1>
    </div>
    <ExerciseList />
    </>
  )
}

export default Mainpage;