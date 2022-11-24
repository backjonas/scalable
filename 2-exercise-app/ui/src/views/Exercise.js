import ExerciseForm from '../components/ExerciseForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeOneExercise } from '../reducers/exerciseReducer'; 

const Exercise = () => {
  const exerciseId = useParams().id;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeOneExercise(exerciseId))
  }, [dispatch, exerciseId])

  const exercise = useSelector((state) => state.exercises.currentExercise)
  return (
    <>
    <a href='/'>
      <h4 className="nav-header">
        Back to mainpage
      </h4>
    </a>
    <h2>Exercise: {exercise.name}</h2>
    <p/>
    <div>
    { exercise.completed?
      'You have already completed this exercise'
      : 'You have not completed this exercise'
    }
    </div>
    <p/>
    <div>{exercise.description}</div>
    <p/>
    <p/>
    <div>
      Write your solution in the box below
    </div>
    <ExerciseForm id={exerciseId}/>
    </>
  )
}

export default Exercise;