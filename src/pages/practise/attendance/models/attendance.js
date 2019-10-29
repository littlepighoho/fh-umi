// import * as Attendance from '../services/attendance';
import * as Attendance from '../services/attendance'
import PathToRegexp from 'path-to-regexp'
export default {
  namespace: 'attendance',
  state: {
    list: {
      attendance:[],

    },
    entites:[],
  },
  effects: {
    *fetchAttendance({payload},{call,put,all}){
      console.log("models mget");
      try{
        const result=yield call(Attendance.getAttendance,payload);
        const ids = result.data.attendances.map((item)=>item.id);
        yield put({
          type:'saveState',
          payload:{
            keyname:'entites',
            data:result.data,
            ids,
          }
        })
      }catch (e) {
        console.log(e);
      }
    },
    * getAttendanceList({ payload }, { call, put,all }) {
      console.log("models list");
      try {
        const result = yield call(Attendance.getAttendanceList, payload);
        const {data}=result.data;
        // console.log("data1",result.data.attendances);
        // const ids = result.data.attendances.map((item)=>item.id) ;
        // console.log("result1",ids);
        yield put({
          type:'fetchAttendance',
          // payload:{
          //   ids,
          // },
        })
      } catch (e) {
      }
    }
  },

  reducers: {
    saveState(state,{payload}){
      return {...state,[payload.keyname] : payload.data};
    }
  }
}

