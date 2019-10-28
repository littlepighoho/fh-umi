import request from '../../../../../utils/request-axios';
import API from '../../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';
import { Spin } from 'antd';

export const setStudent = (payload) =>{
    return request({
        url:API.studentusers.setStudent,
        method:'post',
        data:{
            realname:payload.realname,
            code:payload.code
        }
    })
};

export const editStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.studentusers.editStudent)
    return  request({
        url:pattern({stid:payload.studnetId}),
        method: 'post',
        data:{
            realname:payload.realname,
            code:payload.code
        }
    })
};

export const getStudent = (payload) => {
    console.log(payload)
    const pattern = pathToRegexp.compile(API.studentusers.getstudent)
    return  request({
        url: pattern({ stid: payload.studentId}),
        method: 'get',
    })
};
export const deleteStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.studentusers.deleteStudent)
    return  request({
        url: pattern({ stid: payload.studentId }),
        method: 'delete',
        data:{}
    })
};

export const getList = (payload) => {
    // const pattern = pathToRegexp.compile(API.student.getList)
    return  request({
        // url: pattern({ stid: payload.studentId }),
        url:API.studentusers.getList,
        method: 'get',
    })
};

export const fetchStudentEntities = (payload) => {
    // const pattern = pathToRegexp.compile(API.student.mgetList)
    return request ({
        url: API.studentusers.mgetList,
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