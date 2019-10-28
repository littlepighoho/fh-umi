import request from '../../../../../../utils/request-axios';
import API from '../../../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';
import { Spin } from 'antd';

export const setStudent = (payload) =>{
    return request({
        url:API.Student.setStudent,
        method:'post',
        data:{
            realname:payload.data.realname,
            code:payload.data.code,
            phone:payload.data.phone,
        }
    })
};

export const editStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.Student.editStudent)
    return  request({
        url:pattern({stid:payload.studentId}),
        method: 'put',
        data:{
            realname:payload.realname,
            code:payload.code,
            phone:payload.phone,
        }
    })
};

export const getStudent = (payload) => {
    // console.log("$$000$$$",payload.schoolId)
    const pattern = pathToRegexp.compile(API.Student.getstudent)
    return  request({
        url: pattern({ sid: payload.schoolId,stid: payload.studentId}),
        method: 'get',
        data:{
            schoolId:payload.schoolId
        }
    })
};
export const deleteStudent = (payload) => {
    const pattern = pathToRegexp.compile(API.Student.deleteStudent)
    return  request({
        url: pattern({ sid: payload.schoolId, stid: payload.studentId }),
        method: 'delete',
        data:{}
    })
};

export const getList = (payload) => {
    console.log("service getList",payload.schoolId);
    const pattern = pathToRegexp.compile(API.Student.getList)
    return  request({
        url: pattern({ sid: payload.schoolId }),
        method: 'get',
        data:{
            ids:payload.ids,
            schoolId:payload.schoolId
        }
    })
};

export const fetchStudentEntities = (payload) => {
    console.log("service fet",payload);
    const pattern = pathToRegexp.compile(API.Student.mgetList)
    return request ({
        url: pattern({ sid: payload.schoolId }),
        method: 'post',
        data: {
            ids: payload.ids,
            schoolId:payload.schoolId,
        }
    })
}
