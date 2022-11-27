import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react';

import useWebSocket from '../websocket'
import { setGradingResult } from '../reducers/gradingResultReducer';


const GradingResult = ({ exerciseId }) => {
  const dispatch = useDispatch()
  const ws = useWebSocket({
    socketUrl: 'ws://localhost:5000'
  });

  useEffect(() => {
    if (ws.data) {
      console.log('ws.data', ws.data)
      const { message } = ws.data
      const user = window.localStorage.getItem('exerciseUser');
      console.log(user)
      console.log(message.user);
      if (message.completed === undefined || !user 
         || user !== message.user || message.exerciseId !== parseInt(exerciseId)) {
          console.log('huä')
          return
         } 
      const gradingResult = message.completed ?
        'Your solution is correct' :
        'Your solution is incorrect'
      dispatch(setGradingResult(gradingResult))
    }
  }, [dispatch, ws.data, exerciseId]);

  const gradingResult = useSelector(state => state.gradingResult)
  if (!gradingResult) return

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {gradingResult}
    </div>  
  )
}

export default GradingResult