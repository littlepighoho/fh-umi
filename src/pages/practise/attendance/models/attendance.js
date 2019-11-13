// import * as Attendance from '../services/attendance';
import * as Attendance from '../services/attendance'
import { message } from 'antd';

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
    * getAttendance({ payload }, { call, put, all }) {
      try {
        const result = yield call(Attendance.getAttendance, payload);
        const { data } = result;
        yield put({
          type: 'saveSate',
          payload: false
        })
      } catch (e) {
      }
    },

    //批量获取考勤信息
    * fetchAttendance({ payload }, { call, put, all }) {
      console.log("批量获取考勤信息models_mget",payload);
      try {
        const result = yield call(Attendance.fetchAttendance, payload);
        console.log("批量获取考勤信息", result);
        yield put({
          type: 'saveState',
          payload: {
            keyName: 'entities',
            data: result.data,
          }
        })
      } catch (e) {
        console.log(e);
      }
    },

    //获取考勤列表
    //payload 是
    //
    * getAttendanceList({ payload }, { call, put, all }) {
      console.log("获取考勤列表models",payload);
      try {
        const result = yield call(Attendance.getAttendanceList, payload);
        const { data } = result;
        const ids = data.attendances.map((item) => item.id);
        yield put({
          type: 'fetchAttendance',
          payload: {
            ids,
            limit:payload.pageSize,
            page:payload.page,
            key:payload.key,
            leaver:payload.leaver,
            absent:payload.absent,
            late:payload.late,
          },
        });
        yield put({
          type:'savePagination',
          payload:{
            keyName:'pagination',
            data:result.data.pagination,
          }
        })
      }
      catch (e) {
        console.log(e);
      }
    },

    //删除
    * deleteAttendance({ payload }, { call, put, all }) {
      try {
        const result = yield call(Attendance.deleteAttendance, payload);
        const { data } = result;
        yield put({
          type: 'getAttendanceList',
          payload: {
            // id: payload.student_number,
          }
        })
      } catch (e) {
        console.log("!!!!!!!!!!", e);
      }
    },


    //修改考勤信息
    * exitAttendance({ payload }, { call, put, all }) {
      console.log("models exit");
      try {
        const result = yield call(Attendance.exitAttendance, payload);
        const { data } = result;
        console.log("haha",data);
        yield put({
          type: 'getAttendanceList',
          payload: {
            leaver: result.leaver,
            absent: result.absent,
            late: result.late,
          }
        });
        if(data){
          message.success('修改成功');
        }
      } catch (e) {
        console.log("2222222", e);
      }
    },
  },
    reducers: {

      saveState(state, { payload }) {
        return { ...state, [payload.keyName]: payload.data };
      },
      savePagination(state,{payload}){
        return {...state,[payload.keyName]:payload.data};
      }
    }
}

