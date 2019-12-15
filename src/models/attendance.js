import { message } from 'antd';
import get from 'lodash/get';
import {
  attendanceGetList,
  attendanceFetchList,
  attendanceGetEntity,
  attendanceAdd,
  attendanceDelete,
  attendanceEdit,
} from '@/services/attendance';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.ATTENDANCE.ROOT,

  state: {
    attendanceList: {
      attendances: [],
      pagination: {},
    },
    attendanceEntities: [],
    attendanceEntity: {},
  },
  effects: {
    // 获取考勤列表
    *getAttendanceList({ payload }, { call, put }) {
      try {
        const response = yield call(attendanceGetList, payload);
        const { data } = response;
        const { attendances, pagination } = data;
        yield put({
          type: 'saveAttendanceList',
          payload: {
            attendances,
            pagination,
          },
        });
        const ids = attendances.map(item => item.id);
        yield put({
          type: DVAKEYS.STUDENT.GET_STUDENT_LIST,
          payload: {
            schoolId: payload.schoolId,
            params: {
              limit: 9999,
              page: 1,
            },
          },
        });
        yield put({
          type: 'fetchAttendanceList',
          payload: {
            ids,
            schoolId: payload.schoolId,
            courseId: payload.courseId,
            arrangementId: payload.arrangementId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取考勤信息
    *fetchAttendanceList({ payload }, { call, put }) {
      try {
        const response = yield call(attendanceFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveAttendanceEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取考勤信息
    *getAttendanceEntity({ payload }, { call, put }) {
      try {
        const response = yield call(attendanceGetEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveAttendanceEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 创建考勤
    *addAttendance({ payload }, { call }) {
      try {
        const response = yield call(attendanceAdd, payload);
        const { data } = response;
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除考勤
    *deleteAttendance({ payload }, { call }) {
      try {
        const response = yield call(attendanceDelete, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 修改考勤
    *editAttendance({ payload }, { call }) {
      try {
        const response = yield call(attendanceEdit, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('修改成功')
        } else {
          message.error('修改失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
  },
  reducers: {
    saveAttendanceList(state, { payload }) {
      return {
        ...state,
        attendanceList: payload,
      }
    },
    saveAttendanceEntities(state, { payload }) {
      return {
        ...state,
        attendanceEntities: payload,
      }
    },
    saveAttendanceEntity(state, { payload }) {
      return {
        ...state,
        attendanceEntity: payload,
      }
    },
  },
};
export default Model;
