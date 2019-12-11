import { routerRedux } from 'dva/router';
import { message } from 'antd';
import get from 'lodash/get';
import {
  studentGetList,
  studentFetchList,
  studentGetEntity,
  studentDelete,
  studentAdd,
  studentEdit,
} from '@/services/student';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.STUDENT.ROOT,

  state: {
    studentList: {
      studentusers: [],
      pagination: {},
    },
    studentEntities: [],
    studentEntity: {},
  },
  effects: {
    // 获取学生列表
    *getStudentList({ payload }, { call, put }) {
      try {
        const response = yield call(studentGetList, payload);
        const { data } = response;
        const { studentusers, pagination } = data;
        yield put({
          type: 'saveStudentList',
          payload: {
            studentusers,
            pagination,
          },
        });
        const ids = studentusers.map(item => item.id);
        yield put({
          type: 'fetchStudentList',
          payload: {
            ids,
            schoolId: payload.schoolId,
          },
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 批量获取学生信息
    *fetchStudentList({ payload }, { call, put }) {
      try {
        const response = yield call(studentFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveStudentEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 获取单个学生信息
    *getStudentEntity({ payload }, { call, put }) {
      try {
        const response = yield call(studentGetEntity, payload);
        const { data } = response;
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 创建学生
    *addStudent({ payload }, { call }) {
      try {
        const response = yield call(studentAdd, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('创建成功')
        } else {
          message.error('创建失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 删除学生
    *delStudent({ payload }, { call }) {
      try {
        const response = yield call(studentDelete, payload);
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
    // 编辑学生
    *editStudent({ payload }, { call }) {
      try {
        const response = yield call(studentEdit, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('编辑成功')
        } else {
          message.error('编辑失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    }
  },
  reducers: {
    saveStudentList(state, { payload }) {
      return {
        ...state,
        studentList: payload,
      }
    },
    saveStudentEntities(state, { payload }) {
      return {
        ...state,
        studentEntities: payload,
      }
    },
  },
};
export default Model;
