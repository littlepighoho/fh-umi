import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis' ;


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
    return  request({
        url:API.School.registerSchool,
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