import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../store/store';

const DegreeTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {degrees,loading,error} = useSelector(
    (state:RootState)=>state.degrees
  )

  const [page,setPage]=useState(0)
  return (
    <div>DegreeTable</div>
  )
}

export default DegreeTable