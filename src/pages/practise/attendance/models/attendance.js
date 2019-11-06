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
      console.log("models mget");
      try {
        const result = yield call(Attendance.fetchAttendance, payload);
        console.log("232423423432423", result);
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
    * getAttendanceList({ payload }, { call, put, all }) {
      console.log("models list");
      try {
        const result = yield call(Attendance.getAttendanceList, payload);
        const { data } = result;
        const ids = data.attendances.map((item) => item.id);
        yield put({
          type: 'fetchAttendance',
          payload: {
            ids,
          },
        })
      } catch (e) {
        console.log("!1222232");
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
        })
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
      }
    }
}

