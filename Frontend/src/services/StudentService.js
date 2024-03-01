import http from './http-common'

const createStudnet = (studentData) => {
    return http.post(`/api/students/create`, studentData)
}

const getAllStudent = () => {
    return http.get(`/api/students/all`)
}

const deleteStudent = (id) => {
    return http.delete(`/api/students/delete/${id}`)
}

const updateStudent = (id) => {
    return http.post(`/api/students/update/${id}`)
}

const StudentService = {
    createStudnet,
    getAllStudent,
    updateStudent,
    deleteStudent
}

export default StudentService