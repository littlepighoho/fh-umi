import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis' ;
import pathToRegexp from 'path-to-regexp';


export const registerSchool = (payload) => {
    return  request({
        url:API.School.registerSchool,
        methods: 'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const editSchool = (payload) => {
    return  request({
        url:API.School.editSchool,
        methods: 'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const getSchool = (payload) => {
    console.log(payload)
    const pattern = pathToRegexp.compile(API.School.getSchool)
    return  request({
        url: pattern({ sid: payload.schoolId }),
        methods: 'get',
    })
};

export const delSchool = (payload) => {
    return  request({
        url:API.School.deleteSchool,
        methods: 'post',
        data:{
            name:payload.name,
            description:payload.description
        }
    })
};

export const getList = (payload) => {
    return  request({
        url:API.School.getList,
        methods: 'get',
    })
};

export const fetchSchoolEntities = (payload) => {
    return request ({
        url:API.School.mgetList,
        method: 'post',
        data: {
            ids: payload.ids,
        }
    })
}