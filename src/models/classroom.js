import { message } from 'antd';
import get from 'lodash/get';
import {
  classroomGetList,
  classroomFetchList,
  classroomGetEntity,
  classroomAdd,
  classroomDelete,
  classroomEdit,
  classroomUserDelete,
  classroomUserGetEntity,
  classroomUserAdd,
} from '@/services/classroom';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.CLASSROOM.ROOT,

  state: {
    classroomList: {
      classrooms: [],
      pagination: {},
    },
    classroomEntities: [],
    classroomEntity: {},
    chooseSchool: false,
  },
  effects: {
    // 获取教室列表
    *getClassroomList({ payload }, { call, put }) {
      try {
        const response = yield call(classroomGetList, payload);
        const { data } = response;
        const { classrooms, pagination } = data;
        yield put({
          type: 'saveClassroomList',
          payload: {
            classrooms,
            pagination,
          },
        });
        const ids = classrooms.map(item => item.id);
        yield put({
          type: 'fetchClassroomList',
          payload: {
            ids,
            schoolId: payload.schoolId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取教室信息
    *fetchClassroomList({ payload }, { call, put }) {
      try {
        const response = yield call(classroomFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveClassroomEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取教室信息
    *getClassroomEntity({ payload }, { call, put }) {
      try {
        const response = yield call(classroomGetEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveClassroomEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 批量创建教室
    *addClassroom({ payload }, { call }) {
      try {
        const response = yield call(classroomAdd, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('创建成功')
        } else {
          message.error('创建失败')
        }
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除教室
    *deleteClassroom({ payload }, { call }) {
      try {
        const response = yield call(classroomDelete, payload);
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
    // 修改教室
    *editClassroom({ payload }, { call }) {
      try {
        const response = yield call(classroomEdit, payload);
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
    // 清空教室状态
    *initClassroomList(_, { put }) {
      try {
        yield put({
          type: 'saveInitClassroomList',
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
  },
  reducers: {
    saveClassroomList(state, { payload }) {
      return {
        ...state,
        chooseSchool: true,
        classroomList: payload,
      }
    },
    saveClassroomEntities(state, { payload }) {
      return {
        ...state,
        chooseSchool: true,
        classroomEntities: payload,
      }
    },
    saveClassroomEntity(state, { payload }) {
      return {
        ...state,
        classroomEntity: payload,
      }
    },
    saveInitClassroomList(state, _) {
      return {
        ...state,
        classroomList: {
          classrooms: [],
          pagination: {},
        },
        classroomEntities: [],
        chooseSchool: false,
      }
    },
  },
};
export default Model;
