import React, { useEffect, useState } from 'react'
import StudentService from 'services/StudentService'

const DataStudent = () => {
    const [allStudent,setAllStudent] = useState([])

    const fetchData = async()=>{
        try {
            const res = await StudentService.getAllStudent()
            setAllStudent(res.data.data)
        } catch (error) {
            console.error("Error fetching data",error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>DataStudent</div>
  )
}

export default DataStudent