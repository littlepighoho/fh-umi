import request from '../../../../../../utils/request-axios';
import API from '../../../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';
import { Spin } from 'antd';

export const setStudent = (payload) =>{
    const pattern = pathToRegexp.compile(API.studentusers.setStudent)
    return request({
        url:pattern({sid:payload.schoolId}),
        method:'post',
        data:{
            realname:payload.data.realname,
            code:payload.data.code,
            phone:payload.data.phone,
        }
    })
};

export const editStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.studentusers.editStudent)
    return  request({
        url:pattern({sid:payload.schoolId,stid:payload.studentId}),
        method: 'put',
        data:{
            realname:payload.realname,
            code:payload.code,
            phone:payload.phone,
        }
    })
};

export const getStudent = (payload) => {
    console.log(payload)
    const pattern = pathToRegexp.compile(API.studentusers.getStudent)
    return  request({
        url: pattern({ sid:payload.schoolId,stid: payload.studentId}),
        method: 'get',
    })
};
export const deleteStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.studentusers.deleteStudent)
    return  request({
        url: pattern({ sid:payload.schoolId,stid: payload.studentId }),
        method: 'delete',
        data:{}
    })
};

export const getList = (payload) => {
    const pattern = pathToRegexp.compile(API.student.getList)
    return  request({
        url: pattern({ stid: payload.schoolId }),
        url:API.studentusers.getList,
        method: 'get',
    })
};

export const fetchStudentEntities = (payload) => {
    const pattern = pathToRegexp.compile(API.student.mgetList)
    return request ({
        url: pattern({ sid:payload.schoolId }),
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