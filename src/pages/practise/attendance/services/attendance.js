import request from '../../../../utils/request-axios';
import API from '../../../../utils/apis';
import pathToRegexp from 'path-to-regexp';
/*
* @request {xx, xx, xx,}
*
* */
//批量获取考勤信息 ids
export const fetchAttendance=(payload)=>{
  // console.log("services mget",payload);
  return request({
    url:API.Attendance.getList,
    method:'post',
    data:{
      ids:payload.ids,
    }
  })
};


//获取考勤列表
//data:值，是我传给后台的值
//params用于get
//data用于post

export const getAttendanceList = (payload) => {
  console.log("获取考勤列表services",payload);
  return request({
    url: API.Attendance.getAttendanceList,
    method: 'get',
    params:{
      limit:payload.pageSize,
      page:payload.page,
      key:payload.key,
      leaver:payload.leaver,
      absent:payload.absent,
      late:payload.late,
    }
  })
};

//获取考勤信息
export  const getAttendance = (payload) => {
  // console.log("services atid",payload);
  const pattern = pathToRegexp.compile(API.Attendance.getAttendance);
  return request({
    url:pattern({atid:payload.id}),
    method: 'post',
    data:{
    }
  })
};


//删除
export  const deleteAttendance = (payload)=>{
  var pattern = pathToRegexp.compile(API.Attendance.deleteAttendance);
  return request({
    url:pattern({atid: payload.id,}),
    method:'delete',
    data:{
      student_number :payload.id,
    }
  })
};


//修改
export const exitAttendance = (payload)=>{
  console.log("services",payload);
  var pattern = pathToRegexp.compile(API.Attendance.exitAttendance);
  return request({
    url:pattern({atid: payload.id}),
    method:'put',
    data:{
      // student_number :payload.id,
      leaver:payload.leaver,
      absent:payload.absent,
      late:payload.late,
    }
  })
};









