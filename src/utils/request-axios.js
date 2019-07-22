import axios from 'axios';

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
    Promise.reject(error)
    })
  service.interceptors.response.use((response) =>
    response
  , (error) =>
    Promise.reject(error)
  );
  let response;
  try {
    response = await service(options);
    return response
  } catch (e) {
    return e
  }
}
