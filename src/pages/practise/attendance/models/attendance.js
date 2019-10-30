// import * as Attendance from '../services/attendance';
import * as Attendance from '../services/attendance'
import PathToRegexp from 'path-to-regexp'
export default {
  namespace: 'attendance',
  state: {
    list: {
      attendances:[],
      pagination:{},
    },
    entities:[],
    setities:[],
  },
  effects: {
    //获取考勤信息
    *getAttendance({payload},{call,put,all}){
      try{
        const  result=yield call(Attendance.getAttendance,payload);
        const {data}=result;
        yield put({
          type:'saveSate',
          payload:false
        })
      }catch (e) {
      }
    },

    //批量获取考勤信息
    *fetchAttendance({payload},{call,put,all}){
      console.log("models mget");
      try{
        const result=yield call(Attendance.fetchAttendance,payload);
        // const ids = result.data.attendances.map((item)=>item.id);
        yield put({
          type:'saveState',
          payload:{
            keyName:'entities',
            data:result.data,
            // ids,
          }
        })
      }catch (e) {
        console.log(e);
      }
    },

    //获取考勤列表
    * getAttendanceList({ payload }, { call, put,all }) {
      console.log("models list");
      try {
        const result = yield call(Attendance.getAttendanceList, payload);
        const {data}=result;
        console.log("1111111",data);
        // const id=[];
        // for(let i=0;i<data.attendances.length;i++){
        //   console.log("11",data.attendances[i]);
        //   id.push(data.attendances[i].id);
        // }
        // console.log("data1",result.data.attendances);
        const ids = data.attendances.map((item)=>item.id) ;
        console.log("result1",data.attendances);
        yield put({
          type:'fetchAttendance',
          payload:{
            ids,
          },
        })
      } catch (e) {
        console.log("!1222232");
        console.log(e);
      }
    }
  },

  reducers: {
    saveState(state,{payload}){
      return {...state,[payload.keyName]: payload.data};
    }
  }
}

