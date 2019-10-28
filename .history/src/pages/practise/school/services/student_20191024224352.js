import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';

export const setStudent = (payload) =>{
    return request({
        url:API.Student.setStudent,
        method:'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const editStudent = (payload) => {
    return  request({
        url:API.Student.editStudent,
        method: 'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const getStudent = (payload) => {
    console.log(payload)
    const pattern = pathToRegexp.compile(API.student.getstudent)
    return  request({
        url: pattern({ stid: payload.studentId ,sid:payload.schoolId}),
        method: 'get',
    })
};
export const deleteStudent = (payload) => {
    return  request({
        url:API.Student.deleteStudent,
        method: 'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const getList = (payload) => {
    const pattern = pathToRegexp.compile(API.student.getList)
    return  request({
        url: pattern({ stid: payload.studentId ,sid:payload.schoolId}),
        method: 'get',
    })
};

export const fetchStudentEntities = (payload) => {
    const pattern = pathToRegexp.compile(API.student.mgetList)
    return request ({
        url: pattern({ stid: payload.studentId ,sid:payload.schoolId}),
        method: 'post',
        data: {
            ids: payload.ids,
        }
    })
}

// export const getSchoolId = (payload) =>{
//     return request({

//     })
// }