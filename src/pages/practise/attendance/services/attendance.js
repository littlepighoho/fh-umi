import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis';
import pathToRegexp from 'path-to-regexp';
/*
* @request {xx, xx, xx,}
*
* */
export const getAttendanceList = (payload) => {
  console.log("services list",payload.ids);
  return request({
    url: API.Attendance.getAttendanceList,
    method: 'get',
    payload:{
      ids:payload.ids,
    }
  })
};

export  const getAttendance = (payload) => {
  console.log("services mget");
  // const pattern = pathToRegexp.compile(API.Attendance.getAttendance);
  return request({
    url:API.Attendance.getAttendance,
    method: 'post',
  })
};
