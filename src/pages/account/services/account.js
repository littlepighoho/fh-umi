import request from '../../../utils/request-axios';
import API from '../../../utils/apis';
export const login = (payload) => {
  return request({
    url: API.Account.login,
    method: 'post',
    data: {
      username: payload.username,
      password: payload.password,
    }
  })
};

export const me = () => {
  return request({
    url: API.Account.me,
    method: 'get',
  })
};
export const logout = () => {
  return request({
    url: API.Account.logout,
    method: 'post',
  })
};

export const checkLogin = () => {
  return request({
    url: API.Account.login,
    method: 'get',
  })
};

export const register = (payload) => {
  console.log(payload);
  return request({
    url: API.Account.register,
    method: 'post',
    data: {
      username: payload.email,
      password: payload.password,
      sex: payload.sex,
    },
  })
};

export const accounts = () =>{
  return request({
    url:API.Account.register,
    method:'get'
  })
};

export const getMessage =() =>{
  return request({
    url:API.Account.getMessage,
    method:'get'
  })
};

export const changeMessage =(payload) =>{
  console.log("servise",payload);
  return request({
    url:API.Account.changeMessage,
    method:'put',
    data:{
      username:payload.username,
      role:payload.role,
      motto:payload.motto,
      nickname:payload.nickname,
      sex:payload.sex,
      phone:payload.phone,
      avator : payload.avator,
      new_password:payload.new_password,
      old_password:payload.old_password,
    }
  })
};
