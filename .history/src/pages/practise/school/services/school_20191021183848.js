import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis' ;
import PathToRegxe from 'path-to-regxe';


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
    const pattern = PathToRegxe.compile(API.School.getSchool)
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
export const mgetList = (payload) => {
    return  request({
        url:API.School.mgetList,
        methods: 'post',
    })
};