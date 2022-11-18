import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ExerciseList from '../components/ExerciseList'
import { initializeAllExercises } from '../reducers/exerciseReducer'; 

const Mainpage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAllExercises())
  }, [dispatch])
  return (
    <>
    <div className='center-page'>
      <h1>Exercises</h1>
    </div>
    <ExerciseList />
    </>
  )
}

export default Mainpage;