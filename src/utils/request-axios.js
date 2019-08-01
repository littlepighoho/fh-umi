import axios from 'axios';
import { message } from 'antd';


/**
 * 请求发出后检查返回的状态码，统一捕获正确和错误的状态码，
 * 正确就返回response.data，
 * 错误就自定义一个返回的对象
 * @param { object } response 响应对象
 * @return { object } 响应正常就返回数据 不正常就返回对象
 * */
const checkStatus = (response) => {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data;
  }
  return response;
};

/**
 * 检查完状态码后需要检查后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应
 * @param {object} res 是后台返回的对象或者自定义的网络异常对象，不是http 响应对象
 * @return {object} 返回后台传过来的数据对象，包含code,message,data等属性，
 **/
const checkCode = (res) => {
  console.log(res)
  return res;
};


export default async function request (options) {
  axios.defaults.withCredentials = true;
  const service = axios.create({
    baseURL: "https://api.fh.shoogoome.com",
    withCredentials: true,
    recvType: 'json',
    sendType: 'json',
  });
  //request 拦截器
  service.interceptors.request.use(config =>{
    return config;
  }, error => {
    return Promise.reject(error)
    })
  service.interceptors.response.use((response) =>
    response
  , (error) =>
    Promise.reject(error)
  );
  let response;
  try {
    response = await service(options);
    return response.data
  } catch (e) {
    message.error(e.response.data.error);
    // return e.response;
  }
}
