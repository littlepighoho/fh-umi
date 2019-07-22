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
