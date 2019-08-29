//这里只是一个接口

import request from '@/utils/request-axios';
import API from '../../../utils/apis';

export const team = (payload) => {
  console.log(payload)
  return request({
    url: API.Teams.create,
    method: 'post',
    data: {
      nickname: payload.nickname,
      slogan: payload.slogan,
      public: payload.public,
      password: payload.password
    },
  })
};

