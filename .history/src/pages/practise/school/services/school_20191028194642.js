import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';


export const setSchool = (payload) => {
    return  request({
        url:API.School.setSchool,
        method: 'post',
        data:{
            name:payload.data.name,
            description:payload.data.description,
        }
    })
};

export const editSchool = (payload) => {
    const pattern = pathToRegexp.compile(API.School.editSchool)
    return  request({
        url:pattern({sid:payload.schoolId}),
        method: 'put',
        data:{
            name: payload.name,
            description:payload.description
        }
    })
};

export const getSchool = (payload) => {
    // console.log(payload)
    const pattern = pathToRegexp.compile(API.School.getSchool)
    return  request({
        url: pattern({ sid: payload.schoolId }),
        method: 'get',
    })
};

export const deleteSchool = (payload) => {
    const pattern = pathToRegexp.compile(API.School.deleteSchool)
    return  request({
        url: pattern({ sid: payload.schoolId }),
        method: 'delete',
        data:{}
    })
};

export const getList = (payload) => {
    // console.log("service getList",payload);
    return  request({
        url:API.School.getList,
        method: 'get',
        data:{

        }
    })
};

export const fetchSchoolEntities = (payload) => {
    console.log("service fet" ,payload);
    return request ({
        url:API.School.mgetList,
        method: 'post',
        data: {
            ids: payload.ids,
        }
    })
}