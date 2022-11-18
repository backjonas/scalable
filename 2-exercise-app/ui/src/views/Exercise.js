import ExerciseForm from '../components/ExerciseForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeOneExercise } from '../reducers/exerciseReducer'; 

const Exercise = () => {
  const exerciseId = useParams().id;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOneExercise(exerciseId))
  }, [dispatch])

  return (
    <>
    <a href='/'>
      <h3 className="nav-header">
        Back to mainpage
      </h3>
    </a>
    <ExerciseForm id={exerciseId}/>
    </>
  )
}

export default Exercise;